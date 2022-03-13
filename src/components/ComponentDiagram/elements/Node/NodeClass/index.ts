import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { observable, action, makeObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { NodeBasic, NodeI } from '../NodeBasic';
import ComponentType from '../../../../../models/ComponentType';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import { ComponentI } from '../../../../../models/components/Component';
import { Port } from '../../Port/Port';
import { Modifier } from '../../../../../models/Modifier';

type NodeClassProps = {
    name: string
    extends?: string
    context?: DiagramContext
};

export type ClassProperty = {
    key: string
    name: string,
    modifier: Modifier,
    returnType: string
    isAbstract: boolean
    isOptional: boolean
    isStatic: boolean
};

const DEFAULT_PROPERTY: ClassProperty = {
    key: '',
    name: '',
    modifier: 'public',
    returnType: '',
    isAbstract: false,
    isOptional: false,
    isStatic: false,
};

export type ChangePropertyName = (name: ClassProperty['name'], property: ClassProperty) => void;

class NodeClass extends NodeBasic {
    private extends: string | undefined;

    private readonly portTop: Port;

    private readonly portBottom: Port;

    @observable
    private readonly properties: ClassProperty[];

    constructor(props: NodeClassProps) {
        super({
            name: props.name,
            context: props.context,
            type: ComponentType.CLASS,
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
    removeProperty(property: ClassProperty) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i] === property) {
                this.properties.splice(i, 1);
                break;
            }
        }
    }

    @action.bound
    changePropertyName(name: ClassProperty['name'], property: ClassProperty) {
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
        return this.factory.createClass(this.name, this.extends);
    }
}

export default NodeClass;
