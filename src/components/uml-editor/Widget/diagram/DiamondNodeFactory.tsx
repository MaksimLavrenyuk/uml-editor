import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DiamondNodeModel } from './DiamondNodeModel';
import DiamondNodeWidget from './DiamondNodeWidget';
import { NODE_TYPE } from './constants';

export class DiamondNodeFactory extends AbstractReactFactory<DiamondNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_TYPE);
    }

    generateReactWidget(event: { model: DiamondNodeModel }): JSX.Element {
        return <DiamondNodeWidget engine={this.engine} size={50} node={event.model} />;
    }

    generateModel() {
        return new DiamondNodeModel('class');
    }
}
