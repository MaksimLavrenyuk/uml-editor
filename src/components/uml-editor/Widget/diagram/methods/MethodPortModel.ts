import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { PORT_TYPES } from '../constants';

export class MethodPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: PORT_TYPES.method,
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}

export default MethodPortModel;
