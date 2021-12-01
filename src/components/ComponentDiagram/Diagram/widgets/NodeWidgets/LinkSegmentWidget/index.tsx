import React from 'react';
import Link from '../../../models/Link';
import classes from './LinkSegment.module.scss';

type LinkSegmentWidgetProps = {
    model: Link; path: string,
};

export default function LinkSegmentWidget(props: LinkSegmentWidgetProps) {
    const { model, path } = props;

    return (
        <>
            <path
                d={path}
                fill="none"
                className={classes.path}
                strokeWidth={model.getOptions().width}
                stroke="rgba(255,0,0,0.5)"
            />
        </>
    );
}
