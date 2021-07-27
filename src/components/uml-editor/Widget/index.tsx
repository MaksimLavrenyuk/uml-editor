import React, { DragEvent } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react';
import { DefaultNodeModel, DiagramEngine } from '@projectstorm/react-diagrams';
import { WidgetProps } from './types';
import style from './styles/Widget.module.scss';
import { NODE_CREATOR_EVENT_FORMAT } from '../NodesCreator/constants';
import { ItemStruct } from '../NodesCreator/types';

/**
 * Component for rendering an widget diagram.
 *
 * @param props - React props.
 */
@observer
class Widget extends React.Component<WidgetProps> {
    private static dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    private diagramEngine: DiagramEngine;

    constructor(props: WidgetProps) {
        super(props);
        this.diagramEngine = props.diagramEngine;
    }

    dropHandler = (event: DragEvent) => {
        const { diagramEngine } = this;
        const data: ItemStruct = JSON.parse(event.dataTransfer.getData(NODE_CREATOR_EVENT_FORMAT));
        const nodesCount = diagramEngine.getModel().getNodes().length;

        let node: DefaultNodeModel | null = null;

        if (data.type === 'class') {
            node = new DefaultNodeModel(`Node ${nodesCount + 1}`, 'rgb(192,255,0)');
            node.addInPort('In');
        }

        const point = diagramEngine.getRelativeMousePoint(event);

        if (node) {
            node.setPosition(point);
            diagramEngine.getModel().addNode(node);
        }

        this.forceUpdate();
    };

    render() {
        const {
            diagramEngine,
            dropHandler,
        } = this;

        return (
            <div
                className={style.widget}
                onDrop={dropHandler}
                onDragOver={Widget.dragOverHandler}
            >
                <CanvasWidget engine={diagramEngine} />
            </div>
        );
    }
}

export default Widget;
