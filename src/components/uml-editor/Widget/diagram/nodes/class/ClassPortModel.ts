import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NODE_TYPES } from '../constants';

export class ClassPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: NODE_TYPES.class,
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}
