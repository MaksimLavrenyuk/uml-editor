import { useLingui } from '@lingui/react';
import React, {
    useEffect, useMemo, memo, ForwardedRef,
} from 'react';
import Diagram, { DiagramEvents } from './Diagram';
import DiagramWidget from './Diagram/widgets/DiagramWidget';
import classes from './ComponentDiagram.module.scss';
import ComponentsList from './ComponentsList';
import LinkValidator from './Diagram/models/LinkValidator';
import ComponentFactory from '../../models/factories/ComponentFactory';
import { ComponentI } from '../../models/components/Component';

type DiagramEditorProps = {
    className?: string
    onChange(content: ComponentI[]): void
};

/**
 * Component of the diagram editor. Includes everything you need - host and control.
 *
 * @param props - React props.
 */
const ComponentDiagram = React.forwardRef((props: DiagramEditorProps, diagramRef: ForwardedRef<HTMLDivElement>) => {
    const { className = '', onChange } = props;
    const { i18n } = useLingui();
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
        <div ref={diagramRef} className={`${classes.container} ${className}`}>
            <ComponentsList />
            <DiagramWidget diagram={diagram} />
        </div>
    );
});

export default memo(ComponentDiagram);
