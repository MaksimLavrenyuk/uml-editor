import { KeyboardEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Typography } from '@mui/material';
import { ContentEditableEvent } from 'react-contenteditable';
import * as React from 'react';
import EditableDiv from '../../../../../EditableDiv';

type NameProps = {
    getName(): string
    changeName(name: string): void
};

/**
 * Node name display component.
 *
 * @param props - React props.
 */
function Name(props: NameProps) {
    const { getName, changeName } = props;

    const changeNameHandler = useCallback((event: ContentEditableEvent) => {
        changeName(event.target.value);
    }, [changeName]);

    const keyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.nativeEvent.stopPropagation();
        }
    }, []);

    return (
        <Typography component="h5">
            <EditableDiv html={getName()} onChange={changeNameHandler} onKeyDown={keyDownHandler} />
        </Typography>
    );
}

export default observer(Name);
