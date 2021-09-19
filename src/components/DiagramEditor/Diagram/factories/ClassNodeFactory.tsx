import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { I18n } from '@lingui/core';
import { ClassNodeModel } from '../models/ClassNodeModel';
import ClassNodeWidget from '../widgets/ClassNodeWidget';

export type ClassNodeFactoryProps = {
    i18n: I18n
};

export class ClassNodeFactory extends AbstractReactFactory<ClassNodeModel, DiagramEngine> {
    private readonly i18n: I18n;

    constructor(props: ClassNodeFactoryProps) {
        super('class');
        this.i18n = props.i18n;
    }

    generateReactWidget(event: { model: ClassNodeModel }): JSX.Element {
        return <ClassNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new ClassNodeModel({ name: 'class', i18n: this.i18n });
    }
}