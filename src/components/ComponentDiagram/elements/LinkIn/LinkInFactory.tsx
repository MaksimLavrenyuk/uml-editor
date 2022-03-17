import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import LinkIn from './LinkIn';
import NodeLinkInWidget from './NodeLinkInWidget';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

type LinkFactoryProps = {
    context: DiagramContext
};

export default class LinkInFactory extends DefaultLinkFactory {
    private readonly context: DiagramContext;

    constructor(props: LinkFactoryProps) {
        super('LinkIn');
        this.context = props.context;
    }

    generateModel(): LinkIn {
        return new LinkIn({ context: this.context });
    }

    generateReactWidget(event: GenerateWidgetEvent<LinkIn>) {
        return (
            <g>
                <NodeLinkInWidget link={event.model} diagramEngine={this.engine} />
            </g>
        );
    }
}
