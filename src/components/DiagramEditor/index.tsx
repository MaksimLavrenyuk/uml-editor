import React, {
    useState, useCallback, useMemo, useRef,
} from 'react';
import ComponentDiagram from '../ComponentDiagram';
import CodeEditor from '../CodeEditor';
import classes from './DiagramEditor.module.scss';
import { ComponentI } from '../../models/components/Component';
import FormatterDiagram from '../../lib/Formatter';
import { Formatter } from '../../models/Formatter';
import Resizer from '../Resizer';

/**
 * Component for creating and editing diagrams.
 * Includes a component diagram and a code editor that reflects changes to the diagram.
 *
 */
function DiagramEditor() {
    const diagramRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorContent, setEditorContent] = useState('');
    const formatter: Formatter = useMemo(() => new FormatterDiagram(), []);

    const changeDiagramHandler = useCallback((components: ComponentI[]) => {
        setEditorContent(formatter.serialize(components));
    }, [formatter]);

    return (
        <div ref={containerRef} className={classes.container}>
            <ComponentDiagram ref={diagramRef} onChange={changeDiagramHandler} className={classes.diagram} />
            <Resizer
                parentContainer={containerRef}
                leftContainer={diagramRef}
                rightContainer={editorRef}
            />
            <CodeEditor ref={editorRef} className={classes.code} value={editorContent} />
        </div>
    );
}

export default React.memo(DiagramEditor);
