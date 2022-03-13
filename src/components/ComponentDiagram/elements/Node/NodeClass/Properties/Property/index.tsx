import { observer } from 'mobx-react';
import React, { KeyboardEvent, useCallback } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import { ChangePropertyName, ClassProperty } from '../../index';
import EditableDiv from '../../../../../../EditableDiv';
import RemoveBtn from '../../../NodeWidget/PropertiesWrapper/RemoveBtn';
import classes from './Property.module.scss';
import { PortIn } from '../../../../PortIn';
import Port from '../../../../PortIn/PortInWidget';
import DiagramContext from '../../../../../Diagram/DiagramContext/DiagramContext';

type PropertyProps = {
    property: ClassProperty
    onChangeName: ChangePropertyName
    onRemove(property: ClassProperty): void
    returnTypePort: PortIn
    context: DiagramContext
};

function Property(props: PropertyProps) {
    const {
        property, onChangeName, onRemove, returnTypePort, context,
    } = props;

    const changeNameHandler = useCallback((event: ContentEditableEvent) => {
        onChangeName(event.target.value, property);
    }, [onChangeName, property]);

    const keyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.nativeEvent.stopPropagation();
        }
    }, []);

    const removeHandler = useCallback(() => {
        onRemove(property);
    }, [onRemove, property]);

    return (
        <div className={classes.property}>
            <RemoveBtn onClick={removeHandler} />
            <EditableDiv
                className={classes.propertyName}
                onKeyDown={keyDownHandler}
                html={property.name}
                onChange={changeNameHandler}
            />
            <Port
                port={returnTypePort}
                diagramEngine={context.diagramEngine}
                position="right"
            />
        </div>
    );
}

export default observer(Property);
