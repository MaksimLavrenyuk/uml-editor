import { PortModelAlignment } from '@projectstorm/react-diagrams';
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

class NodeInterface extends NodeBasic {
    private extends: string | undefined;

    private readonly portTop: Port;

    private readonly portBottom: Port;

    constructor(props: NodeInterfaceProps) {
        super({
            name: props.name,
            context: props.context,
            type: ComponentType.INTERFACE,
        });
        this.extends = props.extends;
        this.portTop = new Port({ context: props.context, alignment: PortModelAlignment.TOP });
        this.portBottom = new Port({ context: props.context, alignment: PortModelAlignment.BOTTOM });

        this.addPort(this.portTop);
        this.addPort(this.portBottom);
    }

    extend(node: NodeI) {
        this.extends = node.getName();
        this.context?.onChange();
    }

    removeExtends() {
        this.extends = undefined;
    }

    content(): ComponentI | undefined {
        return this.factory.createInterface(this.name, this.extends);
    }
}

export default NodeInterface;
