import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';
import classes from './NodeWidgetContent.module.scss';

type NodeContentProps = {
    header: ReactNode
};

/**
 * Container for node widget content.
 *
 * @param props - React props.
 */
function NodeWidgetContent(props: NodeContentProps) {
    const { header } = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                {header}
            </CardContent>
        </Card>
    );
}

export default React.memo(NodeWidgetContent);
