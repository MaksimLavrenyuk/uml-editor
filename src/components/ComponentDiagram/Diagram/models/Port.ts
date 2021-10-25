import {
    DefaultLinkModel,
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import isType from '../../../../utils/guards/isType';
import { LinkValidatorI } from './LinkValidator';
import Observable from '../../../../lib/Observable';
import { NodeI } from './Node';

export type PortChangeEvent = BaseEntityEvent<LinkModel> & { port: null | PortModel };

export enum PortEvents {
    targetPortChanged = 'targetPortChanged',
    sourcePortChanged = 'sourcePortChanged',
}

type EventPayload = {
    [PortEvents.sourcePortChanged]: PortChangeEvent
    [PortEvents.targetPortChanged]: PortChangeEvent
};

export class Port extends PortModel {
    private linkValidator: LinkValidatorI;

    private observableSourcePortChanged: Observable<EventPayload[PortEvents.sourcePortChanged]>;

    private observableTargetPortChanged: Observable<EventPayload[PortEvents.targetPortChanged]>;

    constructor(alignment: PortModelAlignment, linkValidator: LinkValidatorI) {
        super({
            type: 'class',
            name: alignment,
            alignment,
        });

        this.linkValidator = linkValidator;
        this.observableSourcePortChanged = new Observable<EventPayload[PortEvents.sourcePortChanged]>();
        this.observableTargetPortChanged = new Observable<EventPayload[PortEvents.targetPortChanged]>();
    }

    public addEventListener<T extends PortEvents>(event: T, subscribe: (payload: EventPayload[T]) => void) {
        switch (event) {
        case PortEvents.sourcePortChanged:
            this.observableSourcePortChanged.registerListener(subscribe);
            break;
        case PortEvents.targetPortChanged:
            this.observableTargetPortChanged.registerListener(subscribe);
            break;
        default:
        }
    }

    createLinkModel(): LinkModel {
        const link = new DefaultLinkModel();

        link.registerListener({
            targetPortChanged: (event: PortChangeEvent | BaseEvent) => {
                if (isType<PortChangeEvent>(event, 'entity')) {
                    const source = event.entity.getSourcePort().getNode();
                    const target = event.entity.getTargetPort().getNode();
                    let isValidLink = false;

                    if (isType<NodeI>(source, 'getName') && isType<NodeI>(target, 'getName')) {
                        isValidLink = source.extend(target);
                    }

                    if (!isValidLink) {
                        event.entity.remove();
                    }
                }
            },
        });

        return link;
    }
}
