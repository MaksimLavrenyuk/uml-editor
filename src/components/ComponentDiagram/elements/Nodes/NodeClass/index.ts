import { action, makeObservable, observable } from 'mobx';
import { debounce } from 'lodash';
import { PortModel } from '@projectstorm/react-diagrams';
import NodeBasic from '../NodeBasic';
import ComponentType from '../../../../../models/ComponentType';
import ClassProperty from './ClassProperty';
import Class from '../../../../../models/components/Class';
import { Property } from '../../../../../models/components/Property';
import PropertyBasic from '../../Properties/Property';
import PortAssociation from '../../Ports/PortAssociation';
import { LinkProps } from '../../Links/LinkBasic';
import PortExtends from '../../Ports/PortExtends';

export type NodeClassProps = {
    component: Class
    linkProps: LinkProps
};

class NodeClass extends NodeBasic {
    private extends: string | undefined;

    @observable
    private readonly properties: ClassProperty[];

    private readonly portsProperties: Map<ClassProperty, PortAssociation>;

    private readonly linkProps: LinkProps;

    public portTopExtends: PortExtends;

    public portBottomExtends: PortExtends;

    constructor(props: NodeClassProps) {
        super({
            type: ComponentType.CLASS,
            name: props.component.name,
        });
        this.extends = props.component.extends;
        this.properties = [];
        this.portsProperties = new Map<ClassProperty, PortAssociation>();
        this.linkProps = props.linkProps;

        this.portTopExtends = new PortExtends({ name: 'portTopExtends', linkProps: props.linkProps });
        this.portBottomExtends = new PortExtends({ name: 'portBottomExtends', linkProps: props.linkProps });

        props.component.members.forEach((member) => {
            if (member instanceof Property) {
                const property = new ClassProperty(member);

                property.events.registerListener('change', this.changePropertyHandler);

                this.addPortsProperty(property);
                this.properties.push(property);
            }
        });

        this.addPort(this.portTopExtends);
        this.addPort(this.portBottomExtends);

        makeObservable(this);
    }

    private changePropertyHandler = debounce((property: PropertyBasic) => {
        this.events.emit('change');
    }, 100);

    extend(node: Class) {
        this.extends = node.name;

        this.events.emit('change');
    }

    removeExtends() {
        this.extends = undefined;
    }

    @action.bound
    newProperty() {
        const property = new ClassProperty();

        property.events.registerListener('change', this.changePropertyHandler);

        this.addPortsProperty(property);
        this.properties.push(property);

        this.events.emit('change');
    }

    @action.bound
    removeProperty(property: ClassProperty) {
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i] === property) {
                this.properties.splice(i, 1);
                break;
            }
        }

        this.portsProperties.delete(property);
        this.events.emit('change');
    }

    getProperties = () => this.properties;

    getPropertyByPort = (port: PortModel) => {
        const portsPropertiesEntries = [...this.portsProperties];

        for (let i = 0; i < portsPropertiesEntries.length; i++) {
            if (portsPropertiesEntries[i][1] === port) return portsPropertiesEntries[i][0];
        }

        return undefined;
    };

    private addPortsProperty(property: ClassProperty) {
        const port = new PortAssociation({
            linkProps: this.linkProps,
        });

        this.portsProperties.set(property, port);
        this.addPort(port);
    }

    getPortsProperty = () => this.portsProperties;

    content(): Class {
        const classNode = new Class(this.name);

        classNode.extends = this.extends;
        classNode.members = this.properties.map((property) => property.content());

        return classNode;
    }
}

export default NodeClass;
