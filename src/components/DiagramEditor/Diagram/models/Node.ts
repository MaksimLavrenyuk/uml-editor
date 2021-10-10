import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { Port } from './Port';
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

export class Node extends NodeModel implements NodeI {
    @observable
    private name: string;

    private factory: ComponentFactory;

    private readonly extend: string | undefined;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.name = props.name;
        this.factory = props.factory;
        this.extend = props.extend;
        this.addPort(new Port(PortModelAlignment.TOP, props.linkValidator));
        this.addPort(new Port(PortModelAlignment.BOTTOM, props.linkValidator));

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
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
