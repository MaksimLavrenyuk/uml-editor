import React, { ReactNode } from 'react';
import { Card, CardContent, CardActionArea } from '@mui/material';
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
                {header}
            </CardContent>
        </Card>
    );
}

export default React.memo(Content);
