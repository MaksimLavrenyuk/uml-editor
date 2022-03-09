import React, { ReactNode } from 'react';
import { Card, CardContent, Divider } from '@mui/material';
import classes from './Content.module.scss';

type NodeContentProps = {
    header: ReactNode
    selected: boolean
};

/**
 * Container for node widget content.
 *
 * @param props - React props.
 */
function Content(props: NodeContentProps) {
    const { header, selected } = props;

    return (
        <Card
            variant="outlined"
            className={`${classes.card} ${selected ? classes.selected : ''}`}
        >
            <CardContent>
                <div className={classes.header}>
                    {header}
                </div>
                <Divider />
            </CardContent>
        </Card>
    );
}

export default React.memo(Content);
