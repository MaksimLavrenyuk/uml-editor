import React, { ForwardedRef, MouseEvent } from 'react';
import classes from './Divider.module.scss';

type DividerProps = {
    onMouseDown(event: MouseEvent<HTMLDivElement>): void
};

const Divider = React.forwardRef((props: DividerProps, dividerRef: ForwardedRef<HTMLDivElement>) => {
    const { onMouseDown } = props;
    const dragStartHandler = () => false;

    return (
        <div
            ref={dividerRef}
            className={classes.divider}
            onDragStart={dragStartHandler}
            onMouseDown={onMouseDown}
        />
    );
});

export default React.memo(Divider);
