import React from 'react';
import { observer } from 'mobx-react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import Name from '../NodeBasicWidget/Name';
import NodeBasicWidget from '../NodeBasicWidget';
import ComponentType from '../../../../../models/ComponentType';
import NodeClass from './index';
import PropertiesWidget from '../../Properties/PropertiesWidget';
import ClassProperties from './ClassProperties';
import PortExtendsWidget from '../../Ports/PortExtends/PortExtendsWidget';
import classes from './NodeClass.module.scss';

export interface NodeWidgetProps {
    node: NodeClass;
    diagramEngine: DiagramEngine,
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeClassWidget(props: NodeWidgetProps) {
    const { node, diagramEngine } = props;

    return (
        <NodeBasicWidget
            selected={node.isSelected()}
            portTop={(
                <PortExtendsWidget
                    className={`${classes.portTop} ${classes.port}`}
                    port={node.portTopExtends}
                    diagramEngine={diagramEngine}
                />
            )}
            portBottom={(
                <PortExtendsWidget
                    className={`${classes.portBottom} ${classes.port}`}
                    port={node.portBottomExtends}
                    diagramEngine={diagramEngine}
                />
            )}
            header={(
                <Name
                    className={classes.name}
                    getName={node.getName}
                    type={ComponentType.CLASS}
                    changeName={node.changeName}
                />
            )}
            content={(
                <PropertiesWidget onAdd={node.newProperty}>
                    <ClassProperties
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

export default observer(NodeClassWidget);
