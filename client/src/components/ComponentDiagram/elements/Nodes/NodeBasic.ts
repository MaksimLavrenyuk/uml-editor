import { NodeModel } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import EventEmitter from 'simple-typed-emitter';
import { ComponentI } from '../../../../models/components/Component';

export interface INode {
    content(): ComponentI
}

export type NodeProps = {
    name: ComponentI['name']
};

type NodeBasicProps = {
    type: ComponentI['componentType'],
} & NodeProps;

type NodeEventMap = {
    change: (() => void)[]
};

abstract class NodeBasic extends NodeModel implements INode {
    @observable
    protected name: string;

    public events: EventEmitter<NodeEventMap>;

    protected constructor(props: NodeBasicProps) {
        super({
            type: props.type,
        });

        this.name = props.name;
        this.events = new EventEmitter<NodeEventMap>();

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.name = name;
        this.events.emit('change');
    }

    getName = () => this.name;

    abstract content(): ComponentI;
}

export default NodeBasic;
