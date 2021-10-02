import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { Node } from '../models/Node';
import NodeInterfaceWidget from '../widgets/NodeWidgets/NodeInterfaceWidget';
import ComponentType from '../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../locales/lang-constants';
import ComponentFactory from '../../../../models/factories/ComponentFactory';

type NodeInterfaceFactoryProps = {
    factory: ComponentFactory
};

/**
 * Factory to create the "Interface" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
export default class NodeInterfaceFactory extends AbstractReactFactory<Node, DiagramEngine> {
    private readonly componentType = ComponentType.INTERFACE;

    private readonly factory: ComponentFactory;

    constructor(props: NodeInterfaceFactoryProps) {
        super(ComponentType.INTERFACE);
        this.factory = props.factory;
    }

    generateReactWidget(event: { model: Node }): JSX.Element {
        return <NodeInterfaceWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new Node({
            type: this.componentType,
            name: COMPONENTS_NAMES[this.componentType],
            factory: this.factory,
        });
    }
}
