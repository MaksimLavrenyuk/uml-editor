import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { I18n } from '@lingui/core';
import { Node } from '../models/Node';
import NodeWidget from '../widgets/NodeWidget';
import ComponentType from '../../../../models/ComponentType';

export type NodeFactoryProps = {
    i18n: I18n
};

export class NodeClassFactory extends AbstractReactFactory<Node, DiagramEngine> {
    private readonly i18n: I18n;

    constructor(props: NodeFactoryProps) {
        super(ComponentType.CLASS);
        this.i18n = props.i18n;
    }

    generateReactWidget(event: { model: Node }): JSX.Element {
        return <NodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new Node({ type: ComponentType.CLASS, name: 'class', i18n: this.i18n });
    }
}
