import * as React from 'react';
import {
    Card, CardContent, Typography,
} from '@material-ui/core';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { makeStyles } from '@material-ui/core/styles';
import { Node } from '../../../models/Node';
import style from './NodeClassWidget.module.scss';

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

    const changeNameHandler = (event: ContentEditableEvent) => {
        node.changeName(event.target.value);
    };

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
                    <Typography variant="h5" component="h2">
                        <ContentEditable html="" onChange={changeNameHandler} />
                    </Typography>
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
