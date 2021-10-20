import {
    DefaultLinkModel,
    LinkModel,
    PortModel,
    PortModelAlignment,
    NodeModel,
} from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import { Subject } from 'rxjs';
import isType from '../../../../utils/guards/isType';
import { LinkValidatorI } from './LinkValidator';

type PortChangeEvent = BaseEntityEvent<LinkModel> & { port: null | PortModel };

export enum PortEvents {
    createLink = 'createLink'
}

type EventPayload = {
    [PortEvents.createLink]: {
        source: NodeModel,
        target: NodeModel,
    }
};

export class Port extends PortModel {
    private linkValidator: LinkValidatorI;

    private observableCreateLink: Subject<EventPayload[PortEvents.createLink]>;

    constructor(alignment: PortModelAlignment, linkValidator: LinkValidatorI) {
        super({
            type: 'class',
            name: alignment,
            alignment,
        });

        this.linkValidator = linkValidator;
        this.observableCreateLink = new Subject<EventPayload[PortEvents.createLink]>();
    }

    public addEventListener<T extends PortEvents>(event: T, subscribe: (payload: EventPayload[T]) => void) {
        const observer = {
            next: subscribe,
        };

        switch (event) {
        case PortEvents.createLink:
            this.observableCreateLink.subscribe(observer);
            break;
        default:
        }
    }

    createLinkModel(): LinkModel {
        const link = new DefaultLinkModel();

        link.registerListener({
            targetPortChanged: (event: PortChangeEvent | BaseEvent) => {
                if (isType<PortChangeEvent>(event, 'entity')) {
                    const sourceNode = event.entity.getSourcePort().getNode();
                    const targetNode = event.entity.getTargetPort().getNode();
                    const isValidLink = this.linkValidator.isValidLink(
                        sourceNode,
                        targetNode,
                    );

                    if (!isValidLink) {
                        event.entity.remove();
                        return;
                    }

                    this.observableCreateLink.next({
                        source: sourceNode,
                        target: targetNode,
                    });
                }
            },
        });

        return link;
    }
}
