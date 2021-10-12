import { PortModel } from '@projectstorm/react-diagrams';
import React, { ReactNode } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import classes from './NodeWidget.module.scss';
import Port from '../Port';
import NodeWidgetContent from '../NodeWidgetContent';

type NodeWidgetProps = {
    portTop: PortModel | null
    portBottom: PortModel | null
    diagramEngine: DiagramEngine,
    header: ReactNode
};

/**
 * Basic widget of the diagram node display.
 *
 * @param props - React props.
 */
function NodeWidget(props: NodeWidgetProps) {
    const {
        portBottom, portTop, diagramEngine, header,
    } = props;

    return (
        <div className={classes.node}>
            <Port port={portTop} diagramEngine={diagramEngine} position="top" />
            <NodeWidgetContent
                header={header}
            />
            <Port port={portBottom} diagramEngine={diagramEngine} position="bottom" />
        </div>
    );
}

export default React.memo(NodeWidget);