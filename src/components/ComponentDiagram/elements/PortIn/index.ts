import {
    LinkModel,
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import LinkIn from '../LinkIn/LinkIn';
import DiagramContext from '../../Diagram/DiagramContext/DiagramContext';

type PortProps = {
    alignment: PortModelAlignment,
    label: string
    context?: DiagramContext
};

export class PortIn extends PortModel {
    private readonly context?: DiagramContext;

    constructor(props: PortProps) {
        super({
            type: 'portIn',
            name: props.label,
            alignment: props.alignment,
        });
        this.context = props.context;
    }

    createLinkModel(): LinkModel {
        return new LinkIn({ context: this.context });
    }
}
