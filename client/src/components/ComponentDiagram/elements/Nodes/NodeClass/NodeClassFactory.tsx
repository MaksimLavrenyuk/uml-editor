import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeClassWidget from './NodeClassWidget';
import ComponentType from '../../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../../locales/lang-constants';
import NodeClass from './index';
import Class from '../../../../../models/components/Class';
import { LinkProps } from '../../Links/LinkBasic';

type NodeClassFactoryProps = {
    diagramEngine: DiagramEngine,
    linkProps: LinkProps
};

/**
 * Factory to create the "Class" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
class NodeClassFactory extends AbstractReactFactory<NodeClass, DiagramEngine> {
    private readonly componentType = ComponentType.CLASS;

    private readonly diagramEngine: DiagramEngine;

    private readonly linkProps: LinkProps;

    constructor(props: NodeClassFactoryProps) {
        super(ComponentType.CLASS);
        this.diagramEngine = props.diagramEngine;
        this.linkProps = props.linkProps;
    }

    generateReactWidget(event: { model: NodeClass }): JSX.Element {
        return (
            <NodeClassWidget
                diagramEngine={this.diagramEngine}
                node={event.model}
            />
        );
    }

    generateModel() {
        return new NodeClass({
            component: new Class(COMPONENTS_NAMES[this.componentType]),
            linkProps: this.linkProps,
        });
    }
}

export default NodeClassFactory;
