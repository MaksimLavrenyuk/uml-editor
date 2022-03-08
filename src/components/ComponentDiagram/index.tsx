import { useLingui } from '@lingui/react';
import React, {
    useEffect, useMemo, memo, ForwardedRef,
} from 'react';
import Diagram from './Diagram';
import DiagramCanvas from './elements/DiagramCanvas';
import classes from './ComponentDiagram.module.scss';
import ComponentsList from './ComponentsList';
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
        new Diagram([], { i18n })
    ), [i18n]);

    useEffect(() => {
        diagram.events.registerListener('change', onChange);
    }, [diagram, onChange]);

    return (
        <div ref={diagramRef} className={`${classes.container} ${className}`}>
            <ComponentsList />
            <DiagramCanvas diagram={diagram} />
        </div>
    );
});

export default memo(ComponentDiagram);
