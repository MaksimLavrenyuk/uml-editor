import React, {
    useState, useCallback, useMemo, useRef,
} from 'react';
import ComponentDiagram from '../ComponentDiagram';
import CodeEditor from '../CodeEditor';
import classes from './DiagramEditor.module.scss';
import { ComponentI } from '../../models/components/Component';
import FormatterDiagram from '../../lib/Formatter';
import { Formatter } from '../../models/Formatter';
import Divider from './Divider';
import getPercent from '../../utils/number/getPercent';

/**
 * Component for creating and editing diagrams.
 * Includes a component diagram and a code editor that reflects changes to the diagram.
 *
 */
function DiagramEditor() {
    const dividerRef = useRef<HTMLDivElement>(null);
    const diagramRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorContent, setEditorContent] = useState('');
    const formatter: Formatter = useMemo(() => new FormatterDiagram(), []);

    const changeDiagramHandler = useCallback((components: ComponentI[]) => {
        setEditorContent(formatter.serialize(components));
    }, [formatter]);

    const mouseDownHandler = useCallback((event: React.MouseEvent) => {
        event.preventDefault(); // предотвратить запуск выделения (действие браузера)
        const divider = dividerRef.current;
        const container = containerRef.current;
        const diagram = diagramRef.current;
        const editor = editorRef.current;
        let shiftX = 0;
        let rightPartWidth = 0;
        let leftPartWidth = 0;

        if (divider) {
            shiftX = event.clientX - divider.getBoundingClientRect().left;
        }

        function onMouseMove(e: MouseEvent) {
            if (container && divider && diagram && editor) {
                let newLeft = e.clientX - shiftX - container.getBoundingClientRect().left;
                // курсор вышел из слайдера => оставить бегунок в его границах.
                if (newLeft < 0) {
                    newLeft = 0;
                }
                const rightEdge = container.offsetWidth - divider.offsetWidth;

                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                rightPartWidth = rightEdge - newLeft;
                leftPartWidth = rightEdge - rightPartWidth;

                divider.style.left = `${newLeft}px`;
                diagram.style.width = `${getPercent(leftPartWidth, rightEdge)}%`;
                editor.style.width = `${getPercent(rightPartWidth, rightEdge)}%`;
            }
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

        if (divider) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    }, []);

    return (
        <div ref={containerRef} className={classes.container}>
            <ComponentDiagram ref={diagramRef} onChange={changeDiagramHandler} className={classes.diagram} />
            <Divider ref={dividerRef} onMouseDown={mouseDownHandler} />
            <CodeEditor ref={editorRef} className={classes.code} value={editorContent} />
        </div>
    );
}

export default React.memo(DiagramEditor);
