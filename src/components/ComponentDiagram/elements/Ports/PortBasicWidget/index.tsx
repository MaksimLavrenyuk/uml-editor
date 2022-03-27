import { PortWidget as DefaultPortWidget, PortModel } from '@projectstorm/react-diagrams';
import React, { ReactNode } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import classes from './PortBasicWidget.module.scss';

export type PortWidgetProps = {
    port: PortModel | null
    diagramEngine: DiagramEngine,
    className?: string
};

type PortBasicWidgetProps = {
    children?: ReactNode
} & PortWidgetProps;

/**
 * PortBasicWidget to create connections between nodes.
 *
 * @param props - React props.
 */
function PortBasicWidget(props: PortBasicWidgetProps) {
    const {
        port, diagramEngine, className, children,
    } = props;

    return (
        <>
            {port && (
                <DefaultPortWidget
                    className={`${classes.port} ${className}`}
                    port={port}
                    engine={diagramEngine}
                >
                    {children !== undefined ? children : <div className={classes.dot} />}
                </DefaultPortWidget>
            )}
        </>
    );
}

export default React.memo(PortBasicWidget);
