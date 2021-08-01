import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NODE_TYPE } from './constants';

export class DiamondPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: NODE_TYPE,
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}
