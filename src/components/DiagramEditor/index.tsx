import React, {
    useState, useCallback, useMemo,
} from 'react';
import ComponentDiagram from '../ComponentDiagram';
import CodeEditor from '../CodeEditor';
import { ComponentI } from '../../models/components/Component';
import FormatterDiagram from '../../lib/Formatter';
import { Formatter } from '../../models/Formatter';
import SplitPane from '../SplitPane';

/**
 * Component for creating and editing diagrams.
 * Includes a component diagram and a code editor that reflects changes to the diagram.
 *
 */
function DiagramEditor() {
    const [editorContent, setEditorContent] = useState('');
    const formatter: Formatter = useMemo(() => new FormatterDiagram(), []);

    const changeDiagramHandler = useCallback((components: ComponentI[]) => {
        setEditorContent(formatter.serialize(components));
    }, [formatter]);

    return (
        <SplitPane>
            <ComponentDiagram onChange={changeDiagramHandler} />
            <CodeEditor value={editorContent} />
        </SplitPane>
    );
}

export default React.memo(DiagramEditor);
