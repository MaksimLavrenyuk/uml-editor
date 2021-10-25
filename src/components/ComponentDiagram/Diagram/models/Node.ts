import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { Port, PortChangeEvent, PortEvents } from './Port';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import { LinkValidatorI } from './LinkValidator';
import Observable from '../../../../lib/Observable';
import isType from '../../../../utils/guards/isType';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
    getName(): string
    extend(node: NodeI): boolean
}

export type NodeProps = {
    name: string
    extends?: string
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

    private extends: string | undefined;

    private observableChange: Observable<EventPayload[NodeEvents.change]>;

    private linkValidator: LinkValidatorI;

    private readonly portTop: Port;

    private readonly portBottom: Port;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.linkValidator = props.linkValidator;
        this.portTop = new Port(PortModelAlignment.TOP, props.linkValidator);
        this.portBottom = new Port(PortModelAlignment.BOTTOM, props.linkValidator);
        this.name = props.name;
        this.factory = props.factory;
        this.extends = props.extends;
        this.observableChange = new Observable<EventPayload[NodeEvents.change]>();

        this.addPort(this.portTop);
        this.addPort(this.portBottom);
        this.registerListeners();

        makeObservable(this);
    }

    private registerListeners() {
        this.portTop.addEventListener(PortEvents.targetPortChanged, () => {
            this.dispatchChangeEvent();
        });
    }

    private dispatchChangeEvent() {
        const content = this.content();
        if (content) this.observableChange.emit(content);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.dispatchChangeEvent();
    }

    public addEventListener<T extends NodeEvents>(event: T, listener: (payload: EventPayload[T]) => void) {
        switch (event) {
        case NodeEvents.change:
            this.observableChange.registerListener(listener);
            break;
        default:
        }
    }

    getName = () => this.name;

    extend(node: NodeI) {
        const isValidLink = this.linkValidator.isValidLink(
            this,
            node,
        );

        if (isValidLink) {
            this.extends = node.getName();

            this.dispatchChangeEvent();
            return true;
        }

        return false;
    }

    content() {
        switch (this.getType()) {
        case ComponentType.CLASS:
            return this.factory.createClass(this.name, this.extends);
        case ComponentType.INTERFACE:
            return this.factory.createInterface(this.name, this.extends);
        default:
            return undefined;
        }
    }
}
