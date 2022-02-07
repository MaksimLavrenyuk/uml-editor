import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';
import classes from './Content.module.scss';

type NodeContentProps = {
    header: ReactNode
};

/**
 * Container for node widget content.
 *
 * @param props - React props.
 */
function Content(props: NodeContentProps) {
    const { header } = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                {header}
            </CardContent>
        </Card>
    );
}

export default React.memo(Content);
