import React, {
    Component, RefObject,
} from 'react';
import classes from './Resizer.module.scss';

type ResizerProps = {
    onMouseDown(event: React.MouseEvent): void
    innerRef: RefObject<HTMLDivElement>
};

class Resizer extends Component<ResizerProps> {
    dragStartHandler() { return false; }

    render() {
        const { dragStartHandler } = this;
        const { onMouseDown, innerRef } = this.props;

        return (
            <div
                role="presentation"
                ref={innerRef}
                className={classes.resizer}
                onDragStart={dragStartHandler}
                onMouseDown={onMouseDown}
            />
        );
    }
}

export default Resizer;
