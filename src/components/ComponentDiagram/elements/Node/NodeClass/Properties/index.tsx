import React from 'react';
import { observer } from 'mobx-react';
import PropertiesWrapper from '../../NodeWidget/PropertiesWrapper';
import ClassProperty from './Property/Property';
import Property from './Property';
import { PortsIn } from '../../NodeBasic';
import DiagramContext from '../../../../Diagram/DiagramContext/DiagramContext';

type PropertiesProps = {
    onAdd(): void
    onRemoveProperty(property: ClassProperty): void
    getProperties(): ClassProperty[]
    getInPorts(): PortsIn
    context: DiagramContext
};

function Properties(props: PropertiesProps) {
    const {
        onAdd,
        getProperties,
        onRemoveProperty,
        getInPorts,
        context,
    } = props;
    const properties = getProperties();
    const portsIn = getInPorts();

    return (
        <PropertiesWrapper
            properties={properties.map((property) => (
                <Property
                    context={context}
                    returnTypePort={portsIn[property.key]}
                    key={property.key}
                    property={property}
                    onRemove={onRemoveProperty}
                />
            ))}
            onAdd={onAdd}
        />
    );
}

export default observer(Properties);
