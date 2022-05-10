import ContentEditable, { Props } from 'react-contenteditable';
import React from 'react';
import classes from './EditableDiv.module.scss';

/**
 * React component for a div with editable contents.
 *
 * @param props - React props.
 */
function EditableDiv(props: Props) {
    const { ref, className = '', ...rest } = props;

    return (
        <ContentEditable {...rest} className={`${className} ${classes.contentEditable}`} />
    );
}

export default EditableDiv;
