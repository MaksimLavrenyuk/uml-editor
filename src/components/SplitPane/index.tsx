import React, { ReactNode, useRef, useMemo } from 'react';
import Pane from './Pane';
import Resizer from './Resizer';
import classes from './SplitPane.module.scss';

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
    const notNullChildren = useMemo(() => removeNullChildren(children), [children]);

    return (
        <div ref={splitPaneRef} className={`${classes.SplitPane} ${className}`}>
            <Pane ref={pane1Ref}>
                {notNullChildren[0]}
            </Pane>
            <Resizer
                parentContainer={splitPaneRef}
                leftContainer={pane1Ref}
                rightContainer={pane2Ref}
            />
            <Pane ref={pane2Ref}>
                {notNullChildren[1]}
            </Pane>
        </div>
    );
}

export default React.memo(SplitPane);
