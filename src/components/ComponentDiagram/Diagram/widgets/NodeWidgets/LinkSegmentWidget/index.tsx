import React, { MouseEvent } from 'react';
import Link from '../../../models/Link';
import classes from './LinkSegment.module.scss';

type LinkSegmentWidgetProps = {
    model: Link; path: string,
};

export default function LinkSegmentWidget(props: LinkSegmentWidgetProps) {
    const { model, path } = props;

    const mouseDownHandler = (event: MouseEvent<SVGElement>) => {
        /**
         * A workaround to disable the default behavior of clicking on a segment.
         * By default the @projectstorm/react-diagrams library creates a point
         * on the segment when clicked. This behavior is not desired.
         * To avoid having to redo the basic DefaultLinkWidget component,
         * it was decided to use this workaround.
         */
        event.stopPropagation();
    };

    return (
        <>
            <path
                onMouseDown={mouseDownHandler}
                d={path}
                fill="none"
                className={classes.path}
                strokeWidth={model.getOptions().width}
                stroke="rgba(255,0,0,0.5)"
            />
        </>
    );
}
