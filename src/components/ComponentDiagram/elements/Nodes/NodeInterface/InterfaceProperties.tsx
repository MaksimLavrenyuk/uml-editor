import { observer } from 'mobx-react';
import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeInterface from './index';
import PropertyWidget from '../../Properties/PropertyWidget';
import RemoveBtn from '../../Properties/PropertyWidget/RemoveBtn';

type InterfacePropertiesProps = {
    getProperties: NodeInterface['getProperties']
    getPortsProperty: NodeInterface['getPortsProperty']
    removeProperty: NodeInterface['removeProperty']
    diagramEngine: DiagramEngine,
};

function InterfaceProperties(props: InterfacePropertiesProps) {
    const {
        getProperties, getPortsProperty, removeProperty, diagramEngine,
    } = props;
    const portsProperty = getPortsProperty();
    const properties = getProperties();

    return (
        <>
            {properties.map((property) => {
                const returnTypePort = portsProperty.get(property);

                if (returnTypePort) {
                    return (
                        <PropertyWidget
                            key={property.key}
                            property={property}
                            returnTypePort={returnTypePort}
                            diagramEngine={diagramEngine}
                        >
                            <RemoveBtn onClick={() => removeProperty(property)} />
                        </PropertyWidget>
                    );
                }

                return undefined;
            })}
        </>
    );
}

export default observer(InterfaceProperties);
