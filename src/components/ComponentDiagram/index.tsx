import { I18n } from '@lingui/core';
import { withI18n } from '@lingui/react';
import { useEffect, useMemo, memo } from 'react';
import Diagram, { DiagramEvents } from './Diagram';
import DiagramWidget from './Diagram/widgets/DiagramWidget';
import classes from './ComponentDiagram.module.scss';
import ComponentsList from './ComponentsList';
import LinkValidator from './Diagram/models/LinkValidator';
import ComponentFactory from '../../models/factories/ComponentFactory';
import { ComponentI } from '../../models/components/Component';

type DiagramEditorProps = {
    i18n: I18n
    className?: string
    onChange(content: ComponentI[]): void
};

/**
 * Component of the diagram editor. Includes everything you need - host and control.
 *
 * @param props - React props.
 */
function ComponentDiagram(props: DiagramEditorProps) {
    const { i18n, className = '', onChange } = props;
    const diagram = useMemo(() => (
        new Diagram([], {
            i18n, linkValidator: new LinkValidator(), componentFactory: new ComponentFactory(),
        })
    ), [i18n]);

    useEffect(() => {
        diagram.addEventListener(DiagramEvents.change, (value) => {
            onChange(value);
        });
    }, [diagram, onChange]);

    return (
        <div className={`${classes.container} ${className}`}>
            <ComponentsList />
            <DiagramWidget diagram={diagram} />
        </div>
    );
}

export default withI18n()(memo(ComponentDiagram));
