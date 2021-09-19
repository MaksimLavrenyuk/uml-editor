import React, { useCallback, DragEvent } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { ComponentKind } from 'tplant/dist/Models/ComponentKind';
import Diagram from '../../../../../models/Diagram';
import classes from './DiagramWidget.module.scss';

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
        const componentKind: ComponentKind = JSON.parse(event.dataTransfer.getData(diagramDragAndDropEvent.ADD));

        diagram.addNode(componentKind, engine.getRelativeMousePoint(event));
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
