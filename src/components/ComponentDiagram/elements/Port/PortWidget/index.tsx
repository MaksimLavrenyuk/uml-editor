import { PortWidget as DefaultPortWidget, PortModel } from '@projectstorm/react-diagrams';
import React from 'react';
import { t } from '@lingui/macro';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './Port.module.scss';

type PortProps = {
    port: PortModel | null
    diagramEngine: DiagramEngine,
    position: 'top' | 'bottom' | 'left' | 'right'
    show?(): boolean
};

/**
 * PortWidget to create connections between nodes.
 *
 * @param props - React props.
 */
function PortWidget(props: PortProps) {
    const {
        port, diagramEngine, position, show,
    } = props;
    const isShow = show?.();

    return (
        <>
            {port && (
                <>
                    {position === 'top' && (
                        <DefaultPortWidget
                            className={`${classes.port} ${classes[position]}`}
                            port={port}
                            engine={diagramEngine}
                        >
                            <div className={classes.dot} />
                        </DefaultPortWidget>
                    )}
                    {position === 'bottom' && isShow && (
                        <DefaultPortWidget
                            className={`${classes.port} ${classes[position]} ${classes.show}`}
                            port={port}
                            engine={diagramEngine}
                        >
                            {t`COMPONENT_EXTENDS`}
                        </DefaultPortWidget>
                    )}
                </>
            )}
        </>
    );
}

export default observer(PortWidget);
