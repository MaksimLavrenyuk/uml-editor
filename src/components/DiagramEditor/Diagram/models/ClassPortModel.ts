import {
    LinkModel, PortModel, DefaultLinkModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';

export class ClassPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: 'class',
            name: alignment,
            alignment,
        });
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel();
    }
}
