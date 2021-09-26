import {
    // LinkModel,
    PortModel,
    // DefaultLinkModel,
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

    // createLinkModel = (): LinkModel => {
    //     const link = new DefaultLinkModel();
    //
    //     link.registerListener({
    //         sourcePortChanged(event: BaseEvent) {
    //             console.log('sourcePortChanged', event, this);
    //         },
    //         targetPortChanged(event: BaseEvent) {
    //             console.log('targetPortChanged', event, this);
    //         },
    //     });
    //
    //     return link;
    // };
}
