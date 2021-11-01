import React, {
    ReactNode, useRef, useMemo, useEffect, useCallback,
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

function SplitPane(props: SplitPaneProps) {
    const { className = '', children } = props;
    const splitPaneRef = useRef<HTMLDivElement>(null);
    const pane1Ref = useRef<HTMLDivElement>(null);
    const pane2Ref = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
    const notNullChildren = useMemo(() => removeNullChildren(children), [children]);

    const move = useCallback((shiftX = 0, mouseMoveClientX = 0) => {
        const resizer = resizerRef.current;
        const parent = splitPaneRef.current;
        const pane1 = pane1Ref.current;
        const pane2 = pane2Ref.current;
        let pane1Width = 0;
        let pane2Width = 0;
        let parentWidth = 0;
        let resizerWidth = 0;
        let workspaceWidth = 0;
        let newLeftPos = 0;

        if (resizer && parent && pane1 && pane2) {
            newLeftPos = mouseMoveClientX + shiftX - parent.getBoundingClientRect().left;
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

            resizer.style.left = `${getPercent(newLeftPos, parentWidth)}%`;
            pane1.style.width = `calc(${getPercent(pane1Width, workspaceWidth)}% - ${resizerWidth / 2}px)`;
            pane2.style.width = `calc(${getPercent(pane2Width, workspaceWidth)}% - ${resizerWidth / 2}px)`;
        }
    }, []);

    const mouseDownHandler = (event: React.MouseEvent) => {
        event.preventDefault(); // prevent the selection from starting (browser action)
        const resizer = resizerRef.current;
        let shiftX = 0;

        if (resizer) {
            shiftX = event.clientX - resizer.getBoundingClientRect().left;
        }

        function onMouseMove(e: MouseEvent) {
            move(shiftX, e.clientX);
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

        if (resizer) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    };

    return (
        <div ref={splitPaneRef} className={`${classes.SplitPane} ${className}`}>
            <Pane ref={pane1Ref}>
                {notNullChildren[0]}
            </Pane>
            <Resizer ref={resizerRef} onMouseDown={mouseDownHandler} />
            <Pane ref={pane2Ref}>
                {notNullChildren[1]}
            </Pane>
        </div>
    );
}

export default React.memo(SplitPane);
