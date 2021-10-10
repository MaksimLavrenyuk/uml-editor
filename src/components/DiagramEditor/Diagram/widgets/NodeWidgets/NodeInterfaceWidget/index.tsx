import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import { Node } from '../../../models/Node';
import style from './NodeInterfaceWidget.module.scss';
import NodeName from '../NodeName';

export interface NodeWidgetProps {
    node: Node;
    engine: DiagramEngine;
}

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeInterfaceWidget(props: NodeWidgetProps) {
    const { node, engine } = props;
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <div className={style.node}>
            {portTop && (
                <PortWidget
                    className={`${style.port} ${style.top}`}
                    port={portTop}
                    engine={engine}
                >
                    <div className={style.dot} />
                </PortWidget>
            )}
            <Card>
                <CardContent>
                    <NodeName getName={node.getName} changeName={node.changeName} />
                </CardContent>
            </Card>
            {portBottom && (
                <PortWidget
                    className={`${style.port} ${style.bottom}`}
                    port={portBottom}
                    engine={engine}
                >
                    <div className={style.dot} />
                </PortWidget>
            )}
        </div>
    );
}

export default NodeInterfaceWidget;
