import { KeyboardEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Typography } from '@mui/material';
import { ContentEditableEvent } from 'react-contenteditable';
import * as React from 'react';
import EditableDiv from '../../../../../EditableDiv';
import Type from '../Type';
import ComponentType from '../../../../../../models/ComponentType';
import classes from './Name.module.scss';

type NameProps = {
    getName(): string
    changeName(name: string): void
    type: ComponentType
};

/**
 * Node name display component.
 *
 * @param props - React props.
 */
function Name(props: NameProps) {
    const { getName, changeName, type } = props;

    const changeNameHandler = useCallback((event: ContentEditableEvent) => {
        changeName(event.target.value);
    }, [changeName]);

    const keyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.nativeEvent.stopPropagation();
        }
    }, []);

    return (
        <Typography className={classes.container} component="h5">
            <Type type={type} />
            <EditableDiv
                className={classes.name}
                html={getName()}
                onChange={changeNameHandler}
                onKeyDown={keyDownHandler}
            />
        </Typography>
    );
}

export default observer(Name);
