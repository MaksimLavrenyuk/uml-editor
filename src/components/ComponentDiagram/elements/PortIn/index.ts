import {
    PortModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';

type PortProps = {
    alignment: PortModelAlignment,
    label: string
};

export class PortIn extends PortModel {
    constructor(props: PortProps) {
        super({
            type: 'portIn',
            name: props.label,
            alignment: props.alignment,
        });
    }
}
