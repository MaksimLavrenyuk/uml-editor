import {
    DefaultLinkModel,
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { BaseEntityEvent, BaseEvent } from '@projectstorm/react-canvas-core';
import isType from '../../../../utils/guards/isType';
import { LinkValidatorI } from './LinkValidator';

type PortChangeEvent = BaseEntityEvent<LinkModel> & { port: null | PortModel };

export class Port extends PortModel {
    private linkValidator: LinkValidatorI;

    constructor(alignment: PortModelAlignment, linkValidator: LinkValidatorI) {
        super({
            type: 'class',
            name: alignment,
            alignment,
        });

        this.linkValidator = linkValidator;
    }

    createLinkModel(): LinkModel {
        const link = new DefaultLinkModel();

        link.registerListener({
            targetPortChanged: (event: PortChangeEvent | BaseEvent) => {
                if (isType<PortChangeEvent>(event, 'entity')) {
                    const isValidLink = this.linkValidator.isValidLink(
                        event.entity.getSourcePort().getNode(),
                        event.entity.getTargetPort().getNode(),
                    );

                    if (!isValidLink) event.entity.remove();
                }
            },
        });

        return link;
    }
}
