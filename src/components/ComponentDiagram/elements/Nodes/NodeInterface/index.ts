import { action, makeObservable, observable } from 'mobx';
import { debounce } from 'lodash';
import { PortModel } from '@projectstorm/react-diagrams';
import NodeBasic from '../NodeBasic';
import PortExtends from '../../Ports/PortExtends';
import ComponentType from '../../../../../models/ComponentType';
import InterfaceProperty from './InterfaceProperty';
import PortAssociation from '../../Ports/PortAssociation';
import { LinkProps } from '../../Links/LinkBasic';
import Interface from '../../../../../models/components/Interface';
import { Property } from '../../../../../models/components/Property';
import PropertyBasic from '../../Properties/Property';

export type NodeInterfaceProps = {
    component: Interface
    linkProps: LinkProps
};

class NodeInterface extends NodeBasic {
    private extends: string | undefined;

    public readonly portExtends: PortExtends;

    @observable
    private readonly properties: InterfaceProperty[];

    private readonly portsProperties: Map<InterfaceProperty, PortAssociation>;

    private readonly linkProps: LinkProps;

    constructor(props: NodeInterfaceProps) {
        super({
            name: props.component.name,
            type: ComponentType.INTERFACE,
        });
        this.extends = props.component.extends;
        this.properties = [];
        this.portsProperties = new Map<InterfaceProperty, PortAssociation>();
        this.linkProps = props.linkProps;

        this.portExtends = new PortExtends({ name: 'portExtends', linkProps: props.linkProps });

        props.component.members.forEach((member) => {
            if (member instanceof Property) {
                const property = new InterfaceProperty(member);

                property.events.registerListener('change', this.changePropertyHandler);

                this.addPortsProperty(property);
                this.properties.push(property);
            }
        });

        this.addPort(this.portExtends);

        makeObservable(this);
    }

    private changePropertyHandler = debounce((property: PropertyBasic) => {
        this.events.emit('change');
    }, 100);

    extend(node: Interface) {
        this.extends = node.name;
    }

    removeExtends() {
        this.extends = undefined;
    }

    @action.bound
    newProperty() {
        const property = new InterfaceProperty();

        property.events.registerListener('change', this.changePropertyHandler);

        this.addPortsProperty(property);
        this.properties.push(property);
    }

    @action.bound
    removeProperty(property: InterfaceProperty) {
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

    private addPortsProperty(property: InterfaceProperty) {
        const port = new PortAssociation({
            linkProps: this.linkProps,
        });

        this.portsProperties.set(property, port);
        this.addPort(port);
    }

    getPortsProperty = () => this.portsProperties;

    content(): Interface {
        const interfaceNode = new Interface(this.name);

        interfaceNode.extends = this.extends;
        interfaceNode.members = this.properties.map((property) => property.content());

        return interfaceNode;
    }
}

export default NodeInterface;
