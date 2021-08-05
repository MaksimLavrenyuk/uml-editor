import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { ClassPortModel } from './ClassPortModel';
import { NODE_TYPES } from '../constants';

export interface DiamondNodeModelGenerics {
    PORT: ClassPortModel;
}

export class ClassNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    public name: string;

    constructor(name: string) {
        super({
            type: NODE_TYPES.class,
        });
        this.name = name;
        this.addPort(new ClassPortModel(PortModelAlignment.TOP));
        this.addPort(new ClassPortModel(PortModelAlignment.BOTTOM));
    }

    changeName(name: string) {
        this.name = name;
    }
}
