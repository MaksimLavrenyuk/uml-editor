import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import classes from './CodeEditor.module.scss';

type CodeEditorProps = {
    className?: string
};

/**
 * Code editor display component. Used by monaco-editor.js.
 *
 * @param props - React props.
 * @see {@link https://github.com/microsoft/monaco-editor}
 */
function CodeEditor(props: CodeEditorProps) {
    const { className = '' } = props;

    return (
        <div className={`${classes.container} ${className}`}>
            <Editor
                defaultLanguage="typescript"
                defaultValue={`
                type Example = 'example' | 'example2'
                `}
            />
        </div>
    );
}

export default React.memo(CodeEditor);
