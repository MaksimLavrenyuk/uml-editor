import { PortModel } from '@projectstorm/react-diagrams';
import React, { ReactNode, useCallback } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { observer } from 'mobx-react';
import classes from './NodeWidget.module.scss';
import Port from '../../Port/PortWidget';
import Content from './Content';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';

type NodeWidgetProps = {
    selected: boolean
    portTop: PortModel | null
    portBottom: PortModel | null
    diagramEngine: DiagramEngine,
    header: ReactNode
    context: DiagramContext
    content: ReactNode
};

/**
 * Basic widget of the diagram node display.
 *
 * @param props - React props.
 */
function NodeWidget(props: NodeWidgetProps) {
    const {
        portBottom, selected, portTop, diagramEngine, header, context, content,
    } = props;
    const { sourcePort } = context.getActiveLink();

    const showBottomPort = () => {
        const links = portBottom?.getLinks();

        return (sourcePort !== null && sourcePort !== portTop)
            || Boolean(links && Object.keys(links).length > 0);
    };

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
            >
                {content}
            </Content>
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
