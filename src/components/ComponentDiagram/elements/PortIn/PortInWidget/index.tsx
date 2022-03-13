import { PortWidget as DefaultPortWidget } from '@projectstorm/react-diagrams';
import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './Port.module.scss';
import { PortIn } from '../index';

type PortProps = {
    port: PortIn | null
    diagramEngine: DiagramEngine,
    position: 'left' | 'right'
};

/**
 * PortInWidget to create connections between properties and nodes.
 *
 * @param props - React props.
 */
function PortInWidget(props: PortProps) {
    const {
        port, diagramEngine, position,
    } = props;

    return (
        <>
            {port && (
                <DefaultPortWidget
                    className={`${classes.port}`}
                    port={port}
                    engine={diagramEngine}
                >
                    <div className={classes.dot} />
                </DefaultPortWidget>
            )}
        </>
    );
}

export default observer(PortInWidget);
