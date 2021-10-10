import * as React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import { makeStyles } from '@material-ui/core/styles';
import { Node } from '../../../models/Node';
import style from './NodeClassWidget.module.scss';
import NodeName from '../NodeName';

export interface NodeWidgetProps {
    node: Node;
    engine: DiagramEngine;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

/**
 * Class node widget for diagram.
 *
 * @param props - React node.
 */
function NodeClassWidget(props: NodeWidgetProps) {
    const { node, engine } = props;
    const classes = useStyles();
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
            <Card className={classes.root}>
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

export default NodeClassWidget;
