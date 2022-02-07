import {
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import isType from '../../../../utils/guards/isType';
import { LinkValidatorI } from '../../LinkValidator';
import Observable from '../../../../lib/Observable';
import { NodeI } from '../Node/Node';
import Link from '../Link/Link';

export type PortEvent = BaseEntityEvent<LinkModel> & { port: null | PortModel };

export enum PortEvents {
    targetPortChanged = 'targetPortChanged',
    sourcePortChanged = 'sourcePortChanged',
    startConnection = 'startConnection',
    endConnection = 'endConnection',
}

export class Port extends PortModel {
    private linkValidator: LinkValidatorI;

    private observableSourcePortChanged = new Observable<PortEvent>();

    private observableTargetPortChanged = new Observable<PortEvent>();

    private observableStartConnection = new Observable<PortEvent>();

    private observableEndConnection = new Observable<PortEvent>();

    constructor(alignment: PortModelAlignment, linkValidator: LinkValidatorI) {
        super({
            type: 'class',
            name: alignment,
            alignment,
        });

        this.linkValidator = linkValidator;
    }

    public addEventListener<T extends PortEvents>(event: T, subscribe: (payload: PortEvent) => void) {
        switch (event) {
        case PortEvents.sourcePortChanged:
            this.observableSourcePortChanged.registerListener(subscribe);
            break;
        case PortEvents.targetPortChanged:
            this.observableTargetPortChanged.registerListener(subscribe);
            break;
        case PortEvents.startConnection:
            this.observableStartConnection.registerListener(subscribe);
            break;
        case PortEvents.endConnection:
            this.observableEndConnection.registerListener(subscribe);
            break;
        default:
        }
    }

    createLinkModel(): LinkModel {
        const link = new Link();

        link.registerListener({
            entityRemoved: (event: PortEvent | BaseEvent) => {
                if (isType<PortEvent>(event, 'entity')) {
                    this.observableEndConnection.emit(event);
                }
            },
            sourcePortChanged: (event: PortEvent | BaseEvent) => {
                if (isType<PortEvent>(event, 'entity')) {
                    this.observableStartConnection.emit(event);
                }
            },
            targetPortChanged: (event: PortEvent | BaseEvent) => {
                if (isType<PortEvent>(event, 'entity')) {
                    const source = event.entity.getSourcePort().getNode();
                    const target = event.entity.getTargetPort().getNode();
                    let isValidLink = false;

                    this.observableEndConnection.emit(event);

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
