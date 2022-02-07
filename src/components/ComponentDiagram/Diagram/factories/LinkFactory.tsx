import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import Link from '../models/Link';
import NodeLinkWidget from '../widgets/NodeWidgets/NodeLinkWidget';

export default class LinkFactory extends DefaultLinkFactory {
    constructor() {
        super('NodeLink');
    }

    generateModel(): Link {
        return new Link();
    }

    generateReactWidget(event: GenerateWidgetEvent<Link>) {
        return (
            <g>
                <NodeLinkWidget link={event.model} diagramEngine={this.engine} />
            </g>
        );
    }
}
