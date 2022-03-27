import { DefaultLinkModel, LinkModel } from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams-core/dist/@types/entities/port/PortModel';
import isType from '../../../../utils/guards/isType';

type LinkEvent = BaseEntityEvent<LinkModel>;

export type RemoveLink = (
    (link: LinkModel) => void
);

export type LinkSourcePortChanged = (
    (port: null | PortModel) => void
);

export type LinkTargetPortChanged = (
    (link: LinkModel) => void
);

export type LinkProps = {
    onRemoveLink: RemoveLink
    onLinkSourcePortChanged: LinkSourcePortChanged
    onLinkTargetPortChanged: LinkTargetPortChanged,
};

type LinkBasicProps = {
    type: string,
} & LinkProps;

type Listeners = {
    entityRemoved(event: LinkEvent | BaseEvent): void,
    sourcePortChanged(event: BaseEvent): void,
    targetPortChanged(event: LinkEvent | BaseEvent): void,
};

abstract class LinkBasic extends DefaultLinkModel {
    protected constructor(props: LinkBasicProps) {
        super({ type: props.type });

        const listeners: Listeners = {
            entityRemoved: (event) => {
                if (isType<LinkEvent>(event, 'entity')) {
                    props.onRemoveLink(event.entity);
                }
            },
            sourcePortChanged: (event) => {
                if (isType<{ port: null | PortModel }>(event, 'port')) {
                    props.onLinkSourcePortChanged(event.port);
                }
            },
            targetPortChanged: (event) => {
                if (isType<LinkEvent>(event, 'entity')) {
                    props.onLinkTargetPortChanged(event.entity);
                }
            },
        };

        this.registerListener(listeners);
    }
}

export default LinkBasic;
