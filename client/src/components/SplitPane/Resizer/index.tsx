import React, {
    Component, RefObject,
} from 'react';
import classes from './Resizer.module.scss';

type ResizerProps = {
    onMouseDown(event: React.MouseEvent): void
    onTouchStart(event: React.TouchEvent): void
    innerRef: RefObject<HTMLDivElement>
};

class Resizer extends Component<ResizerProps> {
    dragStartHandler() { return false; }

    render() {
        const { dragStartHandler } = this;
        const { onMouseDown, onTouchStart, innerRef } = this.props;

        return (
            <div
                role="presentation"
                ref={innerRef}
                className={classes.resizer}
                onDragStart={dragStartHandler}
                onTouchStart={onTouchStart}
                onMouseDown={onMouseDown}
            />
        );
    }
}

export default Resizer;
