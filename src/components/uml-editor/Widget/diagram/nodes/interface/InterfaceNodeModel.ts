import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { InterfacePortModel } from './InterfacePortModel';
import { NODE_TYPES } from '../../constants';

export interface DiamondNodeModelGenerics {
    PORT: InterfacePortModel;
}

export class InterfaceNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    public name: string;

    constructor(name: string) {
        super({
            type: NODE_TYPES.interface,
        });
        this.name = name;
        this.addPort(new InterfacePortModel(PortModelAlignment.TOP));
        this.addPort(new InterfacePortModel(PortModelAlignment.LEFT));
        this.addPort(new InterfacePortModel(PortModelAlignment.BOTTOM));
        this.addPort(new InterfacePortModel(PortModelAlignment.RIGHT));
    }

    changeName(name: string) {
        this.name = name;
    }
}
