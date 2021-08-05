import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NODE_TYPES } from '../constants';

export class InterfacePortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: NODE_TYPES.interface,
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}
