import React from 'react';
import { observer } from 'mobx-react';
import PropertiesWrapper from '../../NodeWidget/PropertiesWrapper';
import { ChangePropertyName, ClassProperty } from '../index';
import Property from './Property';

type PropertiesProps = {
    onAdd(): void
    onRemoveProperty(property: ClassProperty): void
    getProperties(): ClassProperty[]
    onChangeName: ChangePropertyName
};

function Properties(props: PropertiesProps) {
    const {
        onAdd,
        getProperties,
        onChangeName,
        onRemoveProperty,
    } = props;
    const properties = getProperties();

    return (
        <PropertiesWrapper
            properties={properties.map((property) => (
                <Property
                    key={property.key}
                    property={property}
                    onChangeName={onChangeName}
                    onRemove={onRemoveProperty}
                />
            ))}
            onAdd={onAdd}
        />
    );
}

export default observer(Properties);
