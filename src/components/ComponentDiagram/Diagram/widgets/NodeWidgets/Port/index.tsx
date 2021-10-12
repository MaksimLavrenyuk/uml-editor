import { PortWidget, PortModel } from '@projectstorm/react-diagrams';
import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import classes from './Port.module.scss';

type PortProps = {
    port: PortModel | null
    diagramEngine: DiagramEngine,
    position: 'top' | 'bottom' | 'left' | 'right'
};

/**
 * Port to create connections between nodes.
 *
 * @param props - React props.
 */
function Port(props: PortProps) {
    const { port, diagramEngine, position } = props;

    return (
        <>
            {port && (
                <PortWidget
                    className={`${classes.port} ${classes[position]}`}
                    port={port}
                    engine={diagramEngine}
                >
                    <div className={classes.dot} />
                </PortWidget>
            )}
        </>
    );
}

export default React.memo(Port);
