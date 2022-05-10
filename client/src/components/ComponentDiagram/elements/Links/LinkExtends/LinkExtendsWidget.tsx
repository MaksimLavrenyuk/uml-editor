import { DefaultLinkWidget, LinkWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';

export default class LinkExtendsWidget extends DefaultLinkWidget {
    render() {
        // ensure id is present for all points on the path
        const points = this.props.link.getPoints();
        const paths = [];
        this.refPaths = [];

        if (points.length === 2) {
            paths.push(
                this.generateLink(
                    this.props.link.getSVGPath(),
                    {
                        onMouseDown: () => {
                            this.props.link.setSelected(true);
                            /**
                             * Solves the problem
                             * 1) highlight a node
                             * 2) highlight the link
                             * 3) delete the link
                             * Both the node and the link are deleted at the same time.
                             * The expected behavior is to delete only the link.
                             */
                            this.props.link.getSourcePort().getNode().setSelected(false);
                            this.props.link.getTargetPort().getNode().setSelected(false);
                        },
                    },
                    '0',
                ),
            );

            // draw the link as dangeling
            if (this.props.link.getTargetPort() == null) {
                paths.push(this.generatePoint(points[1]));
            }
        } else {
            // draw the multiple anchors and complex line instead
            for (let j = 0; j < points.length - 1; j++) {
                paths.push(
                    this.generateLink(
                        LinkWidget.generateLinePath(points[j], points[j + 1]),
                        {
                            'data-linkid': this.props.link.getID(),
                            'data-point': j,
                            onMouseDown: () => {
                                this.props.link.setSelected(true);
                                /**
                                 * Solves the problem
                                 * 1) highlight a node
                                 * 2) highlight the link
                                 * 3) delete the link
                                 * Both the node and the link are deleted at the same time.
                                 * The expected behavior is to delete only the link.
                                 */
                                this.props.link.getSourcePort().getNode().setSelected(false);
                                this.props.link.getTargetPort().getNode().setSelected(false);
                            },
                        },
                        j,
                    ),
                );
            }

            if (this.renderPoints()) {
                // render the circles
                for (let i = 1; i < points.length - 1; i++) {
                    paths.push(this.generatePoint(points[i]));
                }

                if (this.props.link.getTargetPort() == null) {
                    paths.push(this.generatePoint(points[points.length - 1]));
                }
            }
        }

        return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
    }
}
