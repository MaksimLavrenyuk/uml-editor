import React from 'react';
import ComponentDiagram from '../ComponentDiagram';
import CodeEditor from '../CodeEditor';
import classes from './DiagramEditor.module.scss';

/**
 * Component for creating and editing diagrams.
 * Includes a component diagram and a code editor that reflects changes to the diagram.
 *
 */
function DiagramEditor() {
    return (
        <div className={classes.container}>
            <ComponentDiagram className={classes.diagram} />
            <CodeEditor className={classes.code} />
        </div>
    );
}

export default React.memo(DiagramEditor);
