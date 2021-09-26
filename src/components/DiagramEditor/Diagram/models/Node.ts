import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Port } from './Port';
import ComponentType from '../../../../models/ComponentType';

export type NodeProps = {
    name: string
    i18n: I18n
    type: ComponentType
};

export class Node extends NodeModel {
    public name: string;

    private readonly i18n: I18n;

    constructor(props: NodeProps) {
        super({
            type: props.type,
        });
        this.name = props.name;
        this.i18n = props.i18n;
        this.addPort(new Port(PortModelAlignment.TOP));
        this.addPort(new Port(PortModelAlignment.BOTTOM));
    }

    changeName(name: string) {
        this.name = name;
    }
}
