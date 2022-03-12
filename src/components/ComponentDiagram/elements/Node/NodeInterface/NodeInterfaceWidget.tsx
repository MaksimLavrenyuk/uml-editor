import React from 'react';
import { DiagramEngine, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Node } from '../Node';
import NodeName from '../NodeWidget/Name';
import NodeWidget from '../NodeWidget';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import ComponentType from '../../../../../models/ComponentType';
import Fields from '../NodeWidget/Properties';

export interface NodeWidgetProps {
    node: Node;
    engine: DiagramEngine;
    context: DiagramContext
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeInterfaceWidget(props: NodeWidgetProps) {
    const { node, engine, context } = props;
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <NodeWidget
            context={context}
            selected={node.isSelected()}
            portTop={portTop}
            portBottom={portBottom}
            diagramEngine={engine}
            header={<NodeName getName={node.getName} type={ComponentType.INTERFACE} changeName={node.changeName} />}
            content={<Fields getFields={() => []} onAdd={() => undefined} onRemove={() => undefined} />}
        />
    );
}

export default NodeInterfaceWidget;
