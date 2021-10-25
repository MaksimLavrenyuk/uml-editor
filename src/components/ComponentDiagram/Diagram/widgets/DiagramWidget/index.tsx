import React, { useCallback, DragEvent } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Diagram from '../../../../../models/Diagram';
import classes from './DiagramWidget.module.scss';
import ComponentType from '../../../../../models/ComponentType';

type DiagramWidgetProps = {
    diagram: Diagram
};

export enum diagramDragAndDropEvent {
    ADD = 'DIAGRAM_ADD_NODE',
}

/**
 * Canvas of the diagram editor.
 *
 * @param props - React props.
 */
function DiagramWidget(props: DiagramWidgetProps) {
    const { diagram } = props;

    const dropHandler = useCallback((event: DragEvent) => {
        const engine = diagram.engine();
        const componentType = event.dataTransfer.getData(diagramDragAndDropEvent.ADD) as ComponentType;

        diagram.addNode({
            type: componentType,
            point: engine.getRelativeMousePoint(event),
        });
    }, [diagram]);

    const dragOverHandler = useCallback((event: DragEvent) => {
        event.preventDefault();
    }, []);

    return (
        <div
            className={classes.canvas}
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
        >
            <CanvasWidget engine={diagram.engine()} />
        </div>
    );
}

export default DiagramWidget;
