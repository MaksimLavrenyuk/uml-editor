import {
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import Link from '../Link/Link';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

type PortProps = {
    alignment: PortModelAlignment,
    context?: DiagramContext
};

export class Port extends PortModel {
    private readonly context?: DiagramContext;

    constructor(props: PortProps) {
        super({
            type: 'class',
            name: props.alignment,
            alignment: props.alignment,
        });

        this.context = props.context;
    }

    createLinkModel(): LinkModel {
        return new Link({ context: this.context });
    }
}
