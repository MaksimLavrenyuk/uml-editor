import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { nanoid } from 'nanoid';
import { I18n } from '@lingui/core';
import { ClassPortModel } from './ClassPortModel';
import MethodPortModel from './MethodPortModel';
import MethodModel from './MethodModel';

export interface DiamondNodeModelGenerics {
    PORT: ClassPortModel;
}

export type ClassNodeModelProps = {
    name: string
    i18n: I18n
};

export class ClassNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    public name: string;

    public properties: { [key: string]: { name: string } };

    public methods: { [key: string]: { name: string } };

    private readonly i18n: I18n;

    constructor(props: ClassNodeModelProps) {
        super({
            type: 'class',
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

    newMethod() {
        this.addPort(new MethodPortModel(PortModelAlignment.RIGHT));
    }
}
