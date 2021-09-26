import {
    DefaultLinkModel,
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';

export class Port extends PortModel {
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
