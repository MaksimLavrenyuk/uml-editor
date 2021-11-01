import React, { ForwardedRef } from 'react';
import classes from './Resizer.module.scss';

type ResizerProps = {
    onMouseDown(event: React.MouseEvent): void
};

const Resizer = React.forwardRef((props: ResizerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { onMouseDown } = props;
    const dragStartHandler = () => false;

    return (
        <div
            role="presentation"
            ref={ref}
            className={classes.resizer}
            onDragStart={dragStartHandler}
            onMouseDown={onMouseDown}
        />
    );
});

export default React.memo(Resizer);
