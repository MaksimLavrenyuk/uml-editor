import { PortModel } from '@projectstorm/react-diagrams';
import React, { ReactNode, useCallback } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './NodeWidget.module.scss';
import Port from '../Port';
import NodeWidgetContent from '../NodeWidgetContent';

type NodeWidgetProps = {
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
        portBottom, portTop, diagramEngine, header, findConnection,
    } = props;

    const showBottomPort = useCallback(() => {
        const connection = findConnection();

        return connection.port !== portTop;
    }, [findConnection, portTop]);

    return (
        <div className={classes.node}>
            <Port
                findConnection={findConnection}
                port={portTop}
                diagramEngine={diagramEngine}
                position="top"
            />
            <NodeWidgetContent
                header={header}
            />
            <Port
                show={showBottomPort}
                findConnection={findConnection}
                port={portBottom}
                diagramEngine={diagramEngine}
                position="bottom"
            />
        </div>
    );
}

export default observer(NodeWidget);
