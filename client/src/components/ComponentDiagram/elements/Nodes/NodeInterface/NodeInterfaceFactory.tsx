import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeInterfaceWidget from './NodeInterfaceWidget';
import ComponentType from '../../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../../locales/lang-constants';
import Interface from '../../../../../models/components/Interface';
import { LinkProps } from '../../Links/LinkBasic';
import NodeInterface from './index';

type NodeInterfaceFactoryProps = {
    diagramEngine: DiagramEngine,
    linkProps: LinkProps
};

/**
 * Factory to create the "Class" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
class NodeInterfaceFactory extends AbstractReactFactory<NodeInterface, DiagramEngine> {
    private readonly componentType = ComponentType.INTERFACE;

    private readonly diagramEngine: DiagramEngine;

    private readonly linkProps: LinkProps;

    constructor(props: NodeInterfaceFactoryProps) {
        super(ComponentType.INTERFACE);
        this.diagramEngine = props.diagramEngine;
        this.linkProps = props.linkProps;
    }

    generateReactWidget(event: { model: NodeInterface }): JSX.Element {
        return (
            <NodeInterfaceWidget
                diagramEngine={this.diagramEngine}
                node={event.model}
            />
        );
    }

    generateModel() {
        return new NodeInterface({
            component: new Interface(COMPONENTS_NAMES[this.componentType]),
            linkProps: this.linkProps,
        });
    }
}

export default NodeInterfaceFactory;
