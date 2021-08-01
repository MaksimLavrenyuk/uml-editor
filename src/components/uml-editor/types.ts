import { DiagramEngine } from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';

export interface UmlEditor {
    getEngine(): DiagramEngine
}

export type UmlEditorProps = {
    i18n: I18n
};
