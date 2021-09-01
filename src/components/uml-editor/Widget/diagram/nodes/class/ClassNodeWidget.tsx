import * as React from 'react';
import {
    Card, CardContent, Typography, CardActions, Button,
} from '@material-ui/core';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';
import { ClassNodeModel } from './ClassNodeModel';
import style from '../../styles/widget.module.scss';
import { PORT_TYPES } from '../../constants';

export interface ClassNodeWidgetProps {
    node: ClassNodeModel;
    engine: DiagramEngine;
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

/**
 * Class node for uml widget.
 *
 * @param props - React node.
 */
function ClassNodeWidget(props: ClassNodeWidgetProps) {
    const { node, engine } = props;
    const classes = useStyles();
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);
    const portMethod = node.getPort(PORT_TYPES.method);
    const portProperty = node.getPort(PORT_TYPES.property);

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
                        <ContentEditable html={node.name} onChange={changeNameHandler} />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small" color="primary"><Trans>ADD_METHOD</Trans></Button>
                    <Button variant="outlined" size="small" color="primary"><Trans>ADD_PROPERTY</Trans></Button>
                </CardActions>
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

export default ClassNodeWidget;
