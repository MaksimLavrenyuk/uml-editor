import { DefaultLinkModel, LinkModel } from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams-core/dist/@types/entities/port/PortModel';
import isType from '../../../../utils/guards/isType';
import { NodeI } from '../Node/NodeBasic';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

export type LinkEvent = BaseEntityEvent<LinkModel>;

export type LinkProps = {
    context?: DiagramContext
};

export default class Link extends DefaultLinkModel {
    constructor(props: LinkProps) {
        super({
            type: 'NodeLink',
        });

        this.registerListener({
            entityRemoved: (event: LinkEvent | BaseEvent) => {
                if (isType<LinkEvent>(event, 'entity')) {
                    const source = event.entity.getSourcePort()?.getNode();
                    const target = event.entity.getTargetPort()?.getNode();

                    props.context?.setPort(null);

                    if (isType<NodeI>(source, 'getName') && isType<NodeI>(target, 'getName')) {
                        props.context?.removeLinkHandler(source, target);
                    }
                }
            },
            sourcePortChanged: (event: BaseEvent) => {
                if (isType<{ port: null | PortModel }>(event, 'port')) {
                    props.context?.setPort(event.port);
                }
            },
            targetPortChanged: (event: LinkEvent | BaseEvent) => {
                if (isType<LinkEvent>(event, 'entity')) {
                    const source = event.entity.getSourcePort().getNode();
                    const target = event.entity.getTargetPort().getNode();
                    let isValidLink;

                    if (isType<NodeI>(source, 'getName') && isType<NodeI>(target, 'getName')) {
                        isValidLink = props.context?.createLink(source, target);

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
                            source.setSelected(false);
                            target.setSelected(false);
                        }

                        props.context?.setPort(null);
                    }
                }
            },
        });
    }
}
