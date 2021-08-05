import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { ClassNodeModel } from './ClassNodeModel';
import ClassNodeWidget from './ClassNodeWidget';
import { NODE_TYPES } from '../constants';

export class ClassNodeFactory extends AbstractReactFactory<ClassNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_TYPES.class);
    }

    generateReactWidget(event: { model: ClassNodeModel }): JSX.Element {
        return <ClassNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new ClassNodeModel('class');
    }
}
