import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { InterfaceNodeModel } from './InterfaceNodeModel';
import InterfaceNodeWidget from './InterfaceNodeWidget';
import { NODE_TYPES } from '../constants';

export class InterfaceNodeFactory extends AbstractReactFactory<InterfaceNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_TYPES.interface);
    }

    generateReactWidget(event: { model: InterfaceNodeModel }): JSX.Element {
        return <InterfaceNodeWidget engine={this.engine} size={50} node={event.model} />;
    }

    generateModel() {
        return new InterfaceNodeModel('class');
    }
}
