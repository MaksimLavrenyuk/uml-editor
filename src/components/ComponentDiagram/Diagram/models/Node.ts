import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { Subject } from 'rxjs';
import { Port, PortEvents } from './Port';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import { LinkValidatorI } from './LinkValidator';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
}

export type NodeProps = {
    name: string
    extend?: string
    type: ComponentType
    factory: ComponentFactory
    linkValidator: LinkValidatorI
};

export enum NodeEvents {
    change = 'change'
}

type EventPayload = {
    [NodeEvents.change]: ComponentI
};

export class Node extends NodeModel implements NodeI {
    @observable
    private name: string;

    private factory: ComponentFactory;

    private readonly extend: string | undefined;

    private observableChange: Subject<EventPayload[NodeEvents.change]>;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        const portTop = new Port(PortModelAlignment.TOP, props.linkValidator);
        const portBottom = new Port(PortModelAlignment.BOTTOM, props.linkValidator);
        this.name = props.name;
        this.factory = props.factory;
        this.extend = props.extend;
        this.observableChange = new Subject<EventPayload[NodeEvents.change]>();
        portTop.addEventListener(PortEvents.createLink, () => {
            this.dispatchChangeEvent();
        });
        portBottom.addEventListener(PortEvents.createLink, () => {
            this.dispatchChangeEvent();
        });
        this.addPort(portTop);
        this.addPort(portBottom);

        makeObservable(this);
    }

    private dispatchChangeEvent() {
        const content = this.content();
        if (content) this.observableChange.next(content);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.dispatchChangeEvent();
    }

    public addEventListener<T extends NodeEvents>(event: T, listener: (payload: EventPayload[T]) => void) {
        const observer = {
            next: listener,
        };

        switch (event) {
        case NodeEvents.change:
            this.observableChange.subscribe(observer);
            break;
        default:
        }
    }

    getName = () => this.name;

    content() {
        switch (this.getType()) {
        case ComponentType.CLASS:
            return this.factory.createClass(this.name, this.extend);
        case ComponentType.INTERFACE:
            return this.factory.createInterface(this.name, this.extend);
        default:
            return undefined;
        }
    }
}
