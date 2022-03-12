import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeInterfaceWidget from './NodeInterfaceWidget';
import ComponentType from '../../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../../locales/lang-constants';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import NodeInterface from './index';

type NodeInterfaceFactoryProps = {
    context: DiagramContext
};

/**
 * Factory to create the "Interface" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
export default class NodeInterfaceFactory extends AbstractReactFactory<NodeInterface, DiagramEngine> {
    private readonly componentType = ComponentType.INTERFACE;

    private readonly context: DiagramContext;

    constructor(props: NodeInterfaceFactoryProps) {
        super(ComponentType.INTERFACE);
        this.context = props.context;
    }

    generateReactWidget(event: { model: NodeInterface }): JSX.Element {
        return (
            <NodeInterfaceWidget
                context={this.context}
                engine={this.engine}
                node={event.model}
            />
        );
    }

    generateModel() {
        return new NodeInterface({
            name: COMPONENTS_NAMES[this.componentType],
            context: this.context,
        });
    }
}
