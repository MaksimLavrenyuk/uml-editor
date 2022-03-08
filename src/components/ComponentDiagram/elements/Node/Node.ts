import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { Port } from '../Port/Port';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import ConnectionValidator, { IConnectionValidator } from '../../ConnectionValidator';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
    getName(): string
    removeExtends(): void
    extend(node: NodeI): void
}

export type NodeProps = {
    name: string
    extends?: string
    type: ComponentType
    factory: ComponentFactory
    context: DiagramContext
};

export class Node extends NodeModel implements NodeI {
    @observable
    private name: string;

    private factory: ComponentFactory;

    private extends: string | undefined;

    private readonly portTop: Port;

    private readonly portBottom: Port;

    private context: DiagramContext;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.portTop = new Port({ context: props.context, alignment: PortModelAlignment.TOP });
        this.portBottom = new Port({ context: props.context, alignment: PortModelAlignment.BOTTOM });
        this.name = props.name;
        this.factory = props.factory;
        this.extends = props.extends;
        this.context = props.context;

        this.addPort(this.portTop);
        this.addPort(this.portBottom);

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.context.onChange();
    }

    getName = () => this.name;

    extend(node: NodeI) {
        this.extends = node.getName();
        this.context.onChange();
    }

    removeExtends() {
        this.extends = undefined;
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
