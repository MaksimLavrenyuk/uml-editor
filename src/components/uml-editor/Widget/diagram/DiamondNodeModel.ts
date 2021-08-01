import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';
import { ItemStruct } from '../../items/types';
import { NODE_TYPE } from './constants';

export interface DiamondNodeModelGenerics {
    PORT: DiamondPortModel;
}

export class DiamondNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    public name: string;

    constructor(name: string) {
        super({
            type: NODE_TYPE,
        });
        this.name = name;
        this.addPort(new DiamondPortModel(PortModelAlignment.TOP));
        this.addPort(new DiamondPortModel(PortModelAlignment.LEFT));
        this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM));
        this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT));
    }
}
