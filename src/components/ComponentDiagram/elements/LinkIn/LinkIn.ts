import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { BaseEvent } from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams-core/dist/@types/entities/port/PortModel';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';
import isType from '../../../../utils/guards/isType';
import { LinkEvent } from '../Link/Link';
import { NodeI } from '../Node/NodeBasic';

export type LinkInProps = {
    context?: DiagramContext
};

export default class LinkIn extends DefaultLinkModel {
    constructor(props: LinkInProps) {
        super({
            type: 'LinkIn',
        });

        this.registerListener({
            entityRemoved: (event: LinkEvent | BaseEvent) => {
                // if (isType<LinkEvent>(event, 'entity')) {
                //     const source = event.entity.getSourcePort()?.getNode();
                //     const target = event.entity.getTargetPort()?.getNode();
                //
                //     props.context?.setActiveNodePort(null);
                //
                //     if (isType<NodeI>(source, 'getName') && isType<NodeI>(target, 'getName')) {
                //         props.context?.removeLinkNodes(source, target);
                //     }
                // }
            },
            sourcePortChanged: (event: BaseEvent) => {
                if (isType<{ port: null | PortModel }>(event, 'port')) {
                    props.context?.setActivePropertyPort(event.port);
                }
            },
            targetPortChanged: (event: LinkEvent | BaseEvent) => {
                if (isType<LinkEvent>(event, 'entity')) {
                    const sourcePort = event.entity.getSourcePort();
                    const sourceNode = sourcePort.getNode();
                    const targetNode = event.entity.getTargetPort().getNode();
                    let isValidLink;

                    if (isType<NodeI>(targetNode, 'getName')) {
                        isValidLink = props.context?.connectNodeProperty(sourcePort, targetNode);

                        if (!isValidLink) {
                            event.entity.remove();
                        } else {
                            /**
                             * After successfully connecting the nodes, set the source node as not selected.
                             * This prevents an error:
                             * - drag and drop node
                             * - node in the focus state
                             * - link a node to another node
                             * - the link and the node become selected
                             * - Pressing the "Delete" button, deletes along with the created link also the node.
                             */
                            sourceNode.setSelected(false);
                            targetNode.setSelected(false);
                        }

                        props.context?.setActiveNodePort(null);
                    }
                }
            },
        });
    }
}
