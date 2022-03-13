import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';
import { NodeBasic, NodeI } from '../NodeBasic';
import ComponentType from '../../../../../models/ComponentType';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import { ComponentI } from '../../../../../models/components/Component';
import { Port } from '../../Port/Port';

type NodeInterfaceProps = {
    name: string
    extends?: string
    context?: DiagramContext
};

export type InterfaceProperty = {
    key: string,
    name: string,
    returnType: string
    isOptional: boolean
};

export type ChangePropertyName = (name: InterfaceProperty['name'], property: InterfaceProperty) => void;

const DEFAULT_PROPERTY: InterfaceProperty = {
    key: '',
    name: '',
    returnType: '',
    isOptional: false,
};

class NodeInterface extends NodeBasic {
    private extends: string | undefined;

    private readonly portTop: Port;

    private readonly portBottom: Port;

    @observable
    private readonly properties: InterfaceProperty[];

    constructor(props: NodeInterfaceProps) {
        super({
            name: props.name,
            context: props.context,
            type: ComponentType.INTERFACE,
        });
        this.extends = props.extends;
        this.portTop = new Port({ context: props.context, alignment: PortModelAlignment.TOP });
        this.portBottom = new Port({ context: props.context, alignment: PortModelAlignment.BOTTOM });
        this.properties = [];

        this.addPort(this.portTop);
        this.addPort(this.portBottom);

        makeObservable(this);
    }

    extend(node: NodeI) {
        this.extends = node.getName();
        this.context?.onChange();
    }

    removeExtends() {
        this.extends = undefined;
    }

    @action.bound
    newProperty() {
        this.properties.push({
            ...DEFAULT_PROPERTY,
            key: nanoid(),
        });
    }

    @action.bound
    removeProperty(property: InterfaceProperty) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i] === property) {
                this.properties.splice(i, 1);
                break;
            }
        }
    }

    @action.bound
    changePropertyName(name: InterfaceProperty['name'], property: InterfaceProperty) {
        /**
         * The object is changed directly for the purpose of optimization.
         * The set of properties is wrapped observable, so changing one of the objects
         * will trigger a re-render of the corresponding component.
         */
        // eslint-disable-next-line no-param-reassign
        property.name = name;
    }

    getProperties = () => this.properties;

    content(): ComponentI | undefined {
        return this.factory.createInterface(this.name, this.extends);
    }
}

export default NodeInterface;
