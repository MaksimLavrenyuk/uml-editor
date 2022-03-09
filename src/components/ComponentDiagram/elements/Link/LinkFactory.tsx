import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import Link from './Link';
import NodeLinkWidget from './NodeLinkWidget';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

type LinkFactoryProps = {
    context: DiagramContext
};

export default class LinkFactory extends DefaultLinkFactory {
    private readonly context: DiagramContext;

    constructor(props: LinkFactoryProps) {
        super('NodeLink');
        this.context = props.context;
    }

    generateModel(): Link {
        return new Link({ context: this.context });
    }

    generateReactWidget(event: GenerateWidgetEvent<Link>) {
        return (
            <g>
                <NodeLinkWidget link={event.model} diagramEngine={this.engine} />
            </g>
        );
    }
}
