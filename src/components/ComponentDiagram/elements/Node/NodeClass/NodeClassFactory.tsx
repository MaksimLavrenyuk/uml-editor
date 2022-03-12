import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import NodeClassWidget from './NodeClassWidget';
import ComponentType from '../../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../../locales/lang-constants';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import NodeClass from './index';

type NodeClassFactoryProps = {
    context: DiagramContext
};

/**
 * Factory to create the "Class" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
export class NodeClassFactory extends AbstractReactFactory<NodeClass, DiagramEngine> {
    private readonly componentType = ComponentType.CLASS;

    private readonly context: DiagramContext;

    constructor(props: NodeClassFactoryProps) {
        super(ComponentType.CLASS);
        this.context = props.context;
    }

    generateReactWidget(event: { model: NodeClass }): JSX.Element {
        return (
            <NodeClassWidget
                context={this.context}
                engine={this.engine}
                node={event.model}
            />
        );
    }

    generateModel() {
        return new NodeClass({
            name: COMPONENTS_NAMES[this.componentType],
            context: this.context,
        });
    }
}
