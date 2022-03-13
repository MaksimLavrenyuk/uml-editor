import { observer } from 'mobx-react';
import { KeyboardEvent, useCallback } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import { ChangePropertyName, ClassProperty } from '../../index';
import EditableDiv from '../../../../../../EditableDiv';
import RemoveBtn from '../../../NodeWidget/PropertiesWrapper/RemoveBtn';
import classes from './Property.module.scss';

type PropertyProps = {
    property: ClassProperty
    onChangeName: ChangePropertyName
    onRemove(property: ClassProperty): void
};

function Property(props: PropertyProps) {
    const {
        property, onChangeName, onRemove,
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
        </div>
    );
}

export default observer(Property);
