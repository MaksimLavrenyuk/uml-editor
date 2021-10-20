import React from 'react';
import Editor from '@monaco-editor/react';
import classes from './CodeEditor.module.scss';

type CodeEditorProps = {
    className?: string
    value: string
};

/**
 * Code editor display component. Used by monaco-editor.js.
 *
 * @param props - React props.
 * @see {@link https://github.com/microsoft/monaco-editor}
 */
function CodeEditor(props: CodeEditorProps) {
    const { className = '', value } = props;

    return (
        <div className={`${classes.container} ${className}`}>
            <Editor
                defaultLanguage="typescript"
                value={value}
            />
        </div>
    );
}

export default React.memo(CodeEditor);
