import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DiamondNodeModel } from './DiamondNodeModel';
import DiamondNodeWidget from './DiamondNodeWidget';

export class DiamondNodeFactory extends AbstractReactFactory<DiamondNodeModel, DiagramEngine> {
    constructor() {
        super('diamond');
    }

    generateReactWidget(event: any): JSX.Element {
        return <DiamondNodeWidget engine={this.engine} size={50} node={event.model} />;
    }

    generateModel(event: any) {
        return new DiamondNodeModel();
    }
}
