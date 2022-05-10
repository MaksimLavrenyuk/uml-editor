import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import Name from '../NodeBasicWidget/Name';
import NodeBasicWidget from '../NodeBasicWidget';
import ComponentType from '../../../../../models/ComponentType';
import PropertiesWidget from '../../Properties/PropertiesWidget';
import PortExtendsWidget from '../../Ports/PortExtends/PortExtendsWidget';
import InterfaceProperties from './InterfaceProperties';
import NodeInterface from './index';

export interface NodeWidgetProps {
    node: NodeInterface;
    diagramEngine: DiagramEngine,
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeInterfaceWidget(props: NodeWidgetProps) {
    const { node, diagramEngine } = props;

    return (
        <NodeBasicWidget
            selected={node.isSelected()}
            portTop={<PortExtendsWidget port={node.portExtends} diagramEngine={diagramEngine} />}
            portBottom={undefined}
            header={<Name getName={node.getName} type={ComponentType.CLASS} changeName={node.changeName} />}
            content={(
                <PropertiesWidget onAdd={node.newProperty}>
                    <InterfaceProperties
                        getProperties={node.getProperties}
                        diagramEngine={diagramEngine}
                        removeProperty={node.removeProperty}
                        getPortsProperty={node.getPortsProperty}
                    />
                </PropertiesWidget>
            )}
        />
    );
}

export default NodeInterfaceWidget;
