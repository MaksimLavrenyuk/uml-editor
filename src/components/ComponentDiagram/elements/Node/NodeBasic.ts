import { NodeModel } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../../models/components/Component';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

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

export abstract class NodeBasic extends NodeModel implements NodeI {
    @observable
    protected name: string;

    protected factory: ComponentFactory;

    protected context?: DiagramContext;

    protected constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.name = props.name;
        this.context = props.context;
        this.factory = new ComponentFactory();

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.context?.onChange();
    }

    getName = () => this.name;

    abstract content(): ComponentI | undefined;
}
