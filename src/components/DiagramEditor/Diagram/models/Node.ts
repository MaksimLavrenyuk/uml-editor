import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Port } from './Port';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
}

export type NodeProps = {
    name: string
    extend?: string
    type: ComponentType
    factory: ComponentFactory
};

export class Node extends NodeModel implements NodeI {
    private name: string;

    private factory: ComponentFactory;

    private extend: string | undefined;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.name = props.name;
        this.factory = props.factory;
        this.extend = props.extend;
        this.addPort(new Port(PortModelAlignment.TOP));
        this.addPort(new Port(PortModelAlignment.BOTTOM));
    }

    changeName(name: string) {
        this.name = name;
    }

    content() {
        switch (this.getType()) {
        case ComponentType.CLASS:
            return this.factory.createClass(this.name, this.extend);
        default:
            return undefined;
        }
    }
}
