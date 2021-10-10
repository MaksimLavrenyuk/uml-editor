import { I18n } from '@lingui/core';
import { withI18n } from '@lingui/react';
import { useMemo } from 'react';
import Diagram from './Diagram';
import DiagramWidget from './Diagram/widgets/DiagramWidget';
import classes from './DiagramEditor.module.scss';
import ComponentsList from './ComponentsList';
import LinkValidator from './Diagram/models/LinkValidator';
import ComponentFactory from '../../models/factories/ComponentFactory';

type DiagramEditorProps = {
    i18n: I18n
};

/**
 * Component of the diagram editor. Includes everything you need - host and control.
 *
 * @param props - React props.
 */
function DiagramEditor(props: DiagramEditorProps) {
    const { i18n } = props;
    const diagram = useMemo(() => (
        new Diagram([], {
            i18n, linkValidator: new LinkValidator(), componentFactory: new ComponentFactory(),
        })
    ), [i18n]);

    return (
        <div className={classes.body}>
            <ComponentsList />
            <DiagramWidget diagram={diagram} />
        </div>
    );
}

export default withI18n()(DiagramEditor);
