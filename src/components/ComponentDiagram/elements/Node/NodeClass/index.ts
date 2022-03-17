import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { observable, action, makeObservable } from 'mobx';
import { debounce } from 'lodash';
import { NodeBasic, NodeI } from '../NodeBasic';
import ComponentType from '../../../../../models/ComponentType';
import DiagramContext from '../../../Diagram/DiagramContext/DiagramContext';
import { ComponentI } from '../../../../../models/components/Component';
import { Port } from '../../Port/Port';
import ClassProperty from './Properties/Property/Property';

type NodeClassProps = {
    name: string
    extends?: string
    context?: DiagramContext
};

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

    private debounceChangeEmit = debounce(() => {
        this.context?.onChange();
    }, 100);

    extend(node: NodeI) {
        this.extends = node.getName();
        this.debounceChangeEmit();
    }

    removeExtends() {
        this.extends = undefined;
    }

    @action.bound
    newProperty() {
        const newProperty = new ClassProperty();

        newProperty.events.registerListener('change', () => {
            this.debounceChangeEmit();
        });

        this.addInPort(newProperty.key);
        this.properties.push(newProperty);

        this.debounceChangeEmit();
    }

    @action.bound
    removeProperty(property: ClassProperty) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i] === property) {
                this.properties.splice(i, 1);
                break;
            }
        }

        this.debounceChangeEmit();
    }

    getProperties = () => this.properties;

    getProperty = (key: string) => this.properties.find((property) => property.key === key);

    private collectProperties() {
        return this.properties.map((property) => (this.factory.createProperty(property.content())));
    }

    content(): ComponentI | undefined {
        return this.factory.createClass(this.name, this.extends, this.collectProperties());
    }
}

export default NodeClass;
