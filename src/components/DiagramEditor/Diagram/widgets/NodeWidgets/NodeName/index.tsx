import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import * as React from 'react';

type NameProps = {
    getName(): string
    changeName(name: string): void
};

/**
 * Node name display component.
 *
 * @param props - React props.
 */
function NodeName(props: NameProps) {
    const { getName, changeName } = props;

    const changeNameHandler = useCallback((event: ContentEditableEvent) => {
        changeName(event.target.value);
    }, [changeName]);

    return (
        <Typography variant="h5" component="h2">
            <ContentEditable html={getName()} onChange={changeNameHandler} />
        </Typography>
    );
}

export default observer(NodeName);
