import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel,
} from '@projectstorm/react-diagrams';

import {
    CanvasWidget,
} from '@projectstorm/react-canvas-core';
import { useMemo } from 'react';
import { UmlEditorProps } from './types';
import UmlEditorStore from './UmlEditorStore';
import style from './styles/UmlEditor.module.scss';

/**
 * Component for rendering an uml diagram.
 *
 * @param props - React props.
 */
function UmlEditor(props: UmlEditorProps) {
    const store = useMemo(() => new UmlEditorStore(), []);

    return (
        <CanvasWidget className={style.widget} engine={store.getEngine()} />
    );
}

export default UmlEditor;
