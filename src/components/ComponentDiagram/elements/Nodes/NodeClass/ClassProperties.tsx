import { observer } from 'mobx-react';
import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeClass from './index';
import PropertyWidget from '../../Properties/PropertyWidget';
import RemoveBtn from '../../Properties/PropertyWidget/RemoveBtn';

type ClassPropertiesProps = {
    getProperties: NodeClass['getProperties']
    getPortsProperty: NodeClass['getPortsProperty']
    removeProperty: NodeClass['removeProperty']
    diagramEngine: DiagramEngine,
};

function ClassProperties(props: ClassPropertiesProps) {
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

export default observer(ClassProperties);
