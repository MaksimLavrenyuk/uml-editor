import { DefaultLinkWidget, LinkWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';

export default class NodeLinkWidget extends DefaultLinkWidget {
    render() {
        // ensure id is present for all points on the path
        const points = this.props.link.getPoints();
        const paths = [];

        // draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(
                this.generateLink(
                    LinkWidget.generateLinePath(points[j], points[j + 1]),
                    {
                        'data-linkid': this.props.link.getID(),
                        'data-point': j,
                    },
                    j,
                ),
            );
        }

        return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
    }
}
