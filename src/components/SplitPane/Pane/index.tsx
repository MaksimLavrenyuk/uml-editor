import React, { ForwardedRef, ReactElement, ReactNode } from 'react';
import classes from './Pane.module.scss';

type PaneProps = {
    children: ReactNode
};

function Pane(props: PaneProps, ref: ForwardedRef<HTMLDivElement>) {
    const { children } = props;

    return (
        <div ref={ref} className={classes.pane}>
            {children}
        </div>
    );
}
export default React.forwardRef(Pane);
