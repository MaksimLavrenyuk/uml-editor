import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { Node } from '../models/Node';
import NodeClassWidget from '../widgets/NodeWidgets/NodeClassWidget';
import ComponentType from '../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../locales/lang-constants';
import ComponentFactory from '../../../../models/factories/ComponentFactory';
import { LinkValidatorI } from '../models/LinkValidator';

type NodeClassFactoryProps = {
    factory: ComponentFactory
    linkValidator: LinkValidatorI
    isConnectionMode(): boolean
};

/**
 * Factory to create the "Class" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
export class NodeClassFactory extends AbstractReactFactory<Node, DiagramEngine> {
    private readonly componentType = ComponentType.CLASS;

    private readonly factory: ComponentFactory;

    private readonly linkValidator: LinkValidatorI;

    private readonly isConnectionMode: () => boolean;

    constructor(props: NodeClassFactoryProps) {
        super(ComponentType.CLASS);
        this.factory = props.factory;
        this.linkValidator = props.linkValidator;
        this.isConnectionMode = props.isConnectionMode;
    }

    generateReactWidget(event: { model: Node }): JSX.Element {
        return (
            <NodeClassWidget
                isConnectionMode={this.isConnectionMode}
                engine={this.engine}
                node={event.model}
            />
        );
    }

    generateModel() {
        return new Node({
            type: this.componentType,
            name: COMPONENTS_NAMES[this.componentType],
            factory: this.factory,
            linkValidator: this.linkValidator,
        });
    }
}
