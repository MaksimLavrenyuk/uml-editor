import { PortModel } from '@projectstorm/react-diagrams';
import React, { ReactNode, useCallback } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './NodeWidget.module.scss';
import Port from '../../Port/PortWidget';
import Content from './Content';

type NodeWidgetProps = {
    selected: boolean
    portTop: PortModel | null
    portBottom: PortModel | null
    diagramEngine: DiagramEngine,
    header: ReactNode
    findConnection(): {
        port: null | PortModel,
    }
};

/**
 * Basic widget of the diagram node display.
 *
 * @param props - React props.
 */
function NodeWidget(props: NodeWidgetProps) {
    const {
        portBottom, selected, portTop, diagramEngine, header, findConnection,
    } = props;

    const showBottomPort = useCallback(() => {
        const connection = findConnection();
        const links = portBottom?.getLinks();

        return (connection.port !== null && connection.port !== portTop)
            || Boolean(links && Object.keys(links).length > 0);
    }, [findConnection, portBottom, portTop]);

    return (
        <div className={classes.node}>
            <Port
                port={portTop}
                diagramEngine={diagramEngine}
                position="top"
            />
            <Content
                selected={selected}
                header={header}
            />
            <Port
                show={showBottomPort}
                port={portBottom}
                diagramEngine={diagramEngine}
                position="bottom"
            />
        </div>
    );
}

export default observer(NodeWidget);
