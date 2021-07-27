import { useMemo } from 'react';
import UmlEditorStore from './UmlEditorStore';
import style from './styles/UmlEditor.module.scss';
import NodesCreator from './NodesCreator';
import Widget from './Widget';
import { WidgetStore } from './Widget/WidgetStore';

/**
 * Component for rendering an uml diagram.
 */
function UmlEditor() {
    const widgetStore = useMemo(() => new WidgetStore(), []);

    return (
        <>
            <div className={style.body}>
                <NodesCreator />
                <Widget diagramEngine={widgetStore.getDiagramEngine()} />
            </div>
        </>
    );
}

export default UmlEditor;
