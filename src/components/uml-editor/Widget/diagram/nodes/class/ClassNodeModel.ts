import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { nanoid } from 'nanoid';
import { I18n } from '@lingui/core';
import { ClassPortModel } from './ClassPortModel';
import { NODE_TYPES } from '../../constants';
import { Property } from '../../properties/types';
import { Method } from '../../methods/types';
import MethodPortModel from '../../methods/MethodPortModel';
import PropertyPortModel from '../../properties/PropertyPortModel';
import MethodModel from '../../methods/MethodModel';

export interface DiamondNodeModelGenerics {
    PORT: ClassPortModel;
}

export type ClassNodeModelProps = {
    name: string
    i18n: I18n
};

export class ClassNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    public name: string;

    public properties: { [key: string]: Property };

    public methods: { [key: string]: Method };

    private readonly i18n: I18n;

    constructor(props: ClassNodeModelProps) {
        super({
            type: NODE_TYPES.class,
        });
        this.name = props.name;
        this.i18n = props.i18n;
        this.addPort(new ClassPortModel(PortModelAlignment.TOP));
        this.addPort(new ClassPortModel(PortModelAlignment.BOTTOM));
        this.properties = {};
        this.methods = {};
    }

    changeName(name: string) {
        this.name = name;
    }

    private addMethod(): string {
        const key = nanoid();
        this.methods[key] = new MethodModel({ key, i18n: this.i18n });

        return key;
    }

    newProperty() {
        this.addPort(new PropertyPortModel(this.addMethod(), PortModelAlignment.RIGHT));
    }

    newMethod() {
        this.addPort(new MethodPortModel(PortModelAlignment.RIGHT));
    }
}
