import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { PORT_TYPES } from '../constants';

export class PropertyPortModel extends PortModel {
    constructor(key: string, alignment: PortModelAlignment) {
        super({
            type: PORT_TYPES.property,
            name: key,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}

export default PropertyPortModel;
