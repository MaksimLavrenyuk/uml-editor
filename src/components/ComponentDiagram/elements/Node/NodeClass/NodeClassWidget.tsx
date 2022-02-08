import React from 'react';
import { DiagramEngine, PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Node } from '../Node';
import Name from '../NodeWidget/Name';
import NodeWidget from '../NodeWidget';

export interface NodeWidgetProps {
    node: Node;
    engine: DiagramEngine;
    findConnection(): {
        port: null | PortModel,
    }
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeClassWidget(props: NodeWidgetProps) {
    const { node, engine, findConnection } = props;
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <NodeWidget
            selected={node.isSelected()}
            findConnection={findConnection}
            portTop={portTop}
            portBottom={portBottom}
            diagramEngine={engine}
            header={<Name getName={node.getName} changeName={node.changeName} />}
        />
    );
}

export default NodeClassWidget;
