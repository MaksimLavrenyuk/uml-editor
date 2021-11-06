import React, {
    ReactNode, Component, createRef,
} from 'react';
import Pane from './Pane';
import Resizer from './Resizer';
import classes from './SplitPane.module.scss';
import getPercent from '../../utils/number/getPercent';

type SplitPaneProps = {
    className?: string
    children: ReactNode
};

function removeNullChildren(children: ReactNode) {
    return React.Children.toArray(children).filter((c) => c);
}

class SplitPane extends Component<SplitPaneProps> {
    private splitPaneRef: React.RefObject<HTMLDivElement>;

    private pane1Ref: React.RefObject<HTMLDivElement>;

    private pane2Ref: React.RefObject<HTMLDivElement>;

    private resizerRef: React.RefObject<HTMLDivElement>;

    constructor(props: SplitPaneProps) {
        super(props);

        this.splitPaneRef = createRef<HTMLDivElement>();
        this.pane1Ref = createRef<HTMLDivElement>();
        this.pane2Ref = createRef<HTMLDivElement>();
        this.resizerRef = createRef<HTMLDivElement>();
        this.move = this.move.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.MouseMoveHandler = this.MouseMoveHandler.bind(this);
    }
    //
    // componentDidMount() {
    //     document.addEventListener('mousemove', onMouseMove);
    //     document.addEventListener('mouseup', onMouseUp);
    // }

    move(position = 0) {
        const resizer = this.resizerRef.current;
        const parent = this.splitPaneRef.current;
        const pane1 = this.pane1Ref.current;
        const pane2 = this.pane2Ref.current;
        let pane1Width = 0;
        let pane2Width = 0;
        let parentWidth = 0;
        let resizerWidth = 0;
        let workspaceWidth = 0;
        let newLeftPos = 0;

        if (resizer && parent && pane1 && pane2) {
            newLeftPos = position - parent.getBoundingClientRect().left;
            workspaceWidth = parent.offsetWidth - resizer.offsetWidth;

            parentWidth = parent.offsetWidth;
            resizerWidth = resizer.offsetWidth;

            if (newLeftPos < 0) {
                newLeftPos = 0;
            }

            if (newLeftPos > workspaceWidth) {
                newLeftPos = workspaceWidth;
                newLeftPos -= resizerWidth;
            }

            pane2Width = workspaceWidth - newLeftPos;
            pane1Width = workspaceWidth - pane2Width;

            resizer.style.left = `${getPercent(newLeftPos, parentWidth) || 0}%`;
            pane1.style.width = `calc(${getPercent(pane1Width, workspaceWidth) || 0}% - ${resizerWidth / 2}px)`;
            pane2.style.width = `calc(${getPercent(pane2Width, workspaceWidth) || 0}% - ${resizerWidth / 2}px)`;
        }
    }

    MouseMoveHandler(e: MouseEvent) {
        this.move(e.clientX);
    }

    mouseDownHandler(event: React.MouseEvent) {
        event.preventDefault();
        const resizer = this.resizerRef.current;

        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', this.MouseMoveHandler);
        };

        if (resizer) {
            document.addEventListener('mousemove', this.MouseMoveHandler);
            document.addEventListener('mouseup', onMouseUp);
        }
    }

    render() {
        const {
            splitPaneRef, pane1Ref, pane2Ref, resizerRef, mouseDownHandler,
        } = this;
        const { children, className = '' } = this.props;
        const notNullChildren = removeNullChildren(children);

        return (
            <div ref={splitPaneRef} className={`${classes.SplitPane} ${className}`}>
                <Pane innerRef={pane1Ref}>
                    {notNullChildren[0]}
                </Pane>
                <Resizer innerRef={resizerRef} onMouseDown={mouseDownHandler} />
                <Pane innerRef={pane2Ref}>
                    {notNullChildren[1]}
                </Pane>
            </div>
        );
    }
}

export default SplitPane;
