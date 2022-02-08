import { NodeModel, PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { Port, PortEvents } from '../Port/Port';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import { LinkValidatorI } from '../../LinkValidator';
import Observable from '../../../../lib/Observable';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
    getName(): string
    removeExtends(): void
    extend(node: NodeI): boolean
}

export type NodeProps = {
    name: string
    extends?: string
    type: ComponentType
    factory: ComponentFactory
    linkValidator: LinkValidatorI
};

export class Node extends NodeModel implements NodeI {
    @observable
    private name: string;

    private factory: ComponentFactory;

    private extends: string | undefined;

    public observableChange = new Observable<ComponentI>();

    public observableConnection = new Observable<null | PortModel>();

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

        this.addPort(this.portTop);
        this.addPort(this.portBottom);
        this.registerListeners();

        makeObservable(this);
    }

    private registerListeners() {
        this.portTop.addEventListener(PortEvents.startConnection, (event) => {
            this.observableConnection.emit(event.port);
        });
        this.portTop.addEventListener(PortEvents.endConnection, (event) => {
            this.observableConnection.emit(null);
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

    removeExtends() {
        this.extends = undefined;
        this.dispatchChangeEvent();
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
