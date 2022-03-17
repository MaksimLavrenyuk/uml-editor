import { NodeModel } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { PortModelAlignment } from '@projectstorm/react-diagrams-core';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';
import { PortIn } from '../PortIn';

export interface NodeI extends NodeModel {
    content(): ComponentI | undefined
    getName(): string
    changeName(name: string): void
}

export type NodeProps = {
    name: string
    type: ComponentType
    context?: DiagramContext
};

export type PortsIn = {
    [key: string]: PortIn
};

export abstract class NodeBasic extends NodeModel implements NodeI {
    @observable
    protected name: string;

    protected factory: ComponentFactory;

    protected context?: DiagramContext;

    protected portsIn: {
        [key: string]: PortIn
    };

    protected constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.name = props.name;
        this.context = props.context;
        this.factory = new ComponentFactory();
        this.portsIn = {};

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.context?.onChange();
    }

    getName = () => this.name;

    protected addInPort(label: string) {
        const p = new PortIn({
            label,
            alignment: PortModelAlignment.RIGHT,
            context: this.context,
        });

        this.portsIn[label] = p;
        this.addPort(p);
    }

    getInPorts = (): PortsIn => this.portsIn;

    abstract content(): ComponentI | undefined;
}
