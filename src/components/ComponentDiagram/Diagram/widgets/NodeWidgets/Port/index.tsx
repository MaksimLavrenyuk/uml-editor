import { PortWidget, PortModel } from '@projectstorm/react-diagrams';
import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './Port.module.scss';

type PortProps = {
    port: PortModel | null
    diagramEngine: DiagramEngine,
    position: 'top' | 'bottom' | 'left' | 'right'
    findConnection(): {
        port: null | PortModel,
    }
    show?(): boolean
};

/**
 * Port to create connections between nodes.
 *
 * @param props - React props.
 */
function Port(props: PortProps) {
    const {
        port, diagramEngine, position, findConnection, show,
    } = props;
    const connection = findConnection();
    const isShow = show?.();

    return (
        <>
            {port && (
                <>
                    {position === 'top' && (
                        <PortWidget
                            className={`${classes.port} ${classes[position]}`}
                            port={port}
                            engine={diagramEngine}
                        >
                            <div className={classes.dot} />
                        </PortWidget>
                    )}
                    {position === 'bottom' && isShow && (
                        <PortWidget
                            className={`${classes.port} ${classes[position]} ${connection.port ? classes.show : ''}`}
                            port={port}
                            engine={diagramEngine}
                        >
                            <div className={classes.dot} />
                        </PortWidget>
                    )}
                </>
            )}
        </>
    );
}

export default observer(Port);
