import React from 'react';
import { DiagramEngine, PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Node } from '../../../models/Node';
import NodeName from '../NodeName';
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
function NodeInterfaceWidget(props: NodeWidgetProps) {
    const { node, engine, findConnection } = props;
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <NodeWidget
            findConnection={findConnection}
            portTop={portTop}
            portBottom={portBottom}
            diagramEngine={engine}
            header={<NodeName getName={node.getName} changeName={node.changeName} />}
        />
    );
}

export default NodeInterfaceWidget;
