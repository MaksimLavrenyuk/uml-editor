import React, { Component, ReactNode, RefObject } from 'react';
import classes from './Pane.module.scss';

type PaneProps = {
    children: ReactNode
    innerRef: RefObject<HTMLDivElement>
};

class Pane extends Component<PaneProps> {
    render() {
        const { innerRef, children } = this.props;
        return (
            <div ref={innerRef} className={classes.pane}>
                {children}
            </div>
        );
    }
}

export default Pane;
