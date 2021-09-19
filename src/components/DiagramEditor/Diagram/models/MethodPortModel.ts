import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';

export class MethodPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: 'method',
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}

export default MethodPortModel;
