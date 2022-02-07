import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { PortModel } from '@projectstorm/react-diagrams';
import { Node } from '../Node';
import NodeInterfaceWidget from './NodeInterfaceWidget';
import ComponentType from '../../../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../../../locales/lang-constants';
import ComponentFactory from '../../../../../models/factories/ComponentFactory';
import { LinkValidatorI } from '../../LinkValidator';

type NodeInterfaceFactoryProps = {
    factory: ComponentFactory
    linkValidator: LinkValidatorI
    findConnection(): {
        port: null | PortModel,
    }
};

/**
 * Factory to create the "Interface" nodes of the diagram.
 * With its help the widget of such a node is created.
 */
export default class NodeInterfaceFactory extends AbstractReactFactory<Node, DiagramEngine> {
    private readonly componentType = ComponentType.INTERFACE;

    private readonly factory: ComponentFactory;

    private readonly linkValidator: LinkValidatorI;

    private findConnection: () => {
        port: null | PortModel,
    };

    constructor(props: NodeInterfaceFactoryProps) {
        super(ComponentType.INTERFACE);
        this.factory = props.factory;
        this.linkValidator = props.linkValidator;
        this.findConnection = props.findConnection;
    }

    generateReactWidget(event: { model: Node }): JSX.Element {
        return (
            <NodeInterfaceWidget
                engine={this.engine}
                node={event.model}
                findConnection={this.findConnection}
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
