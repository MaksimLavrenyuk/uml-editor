import React from 'react';
import { DiagramEngine, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Node } from '../../../models/Node';
import NodeName from '../NodeName';
import NodeWidget from '../NodeWidget';

export interface NodeWidgetProps {
    node: Node;
    engine: DiagramEngine;
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeClassWidget(props: NodeWidgetProps) {
    const { node, engine } = props;
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <NodeWidget
            portTop={portTop}
            portBottom={portBottom}
            diagramEngine={engine}
            header={<NodeName getName={node.getName} changeName={node.changeName} />}
        />
    );
}

export default NodeClassWidget;
