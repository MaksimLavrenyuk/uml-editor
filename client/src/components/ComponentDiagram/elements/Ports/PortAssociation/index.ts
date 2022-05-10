import PortBasic, { PortProps } from '../PortBasic';
import LinkAssociation from '../../Links/LinkAssociation';

class PortAssociation extends PortBasic {
    static type = 'PortAssociation';

    constructor(props: PortProps) {
        super({
            type: PortAssociation.type,
            name: PortAssociation.type,
            linkProps: props.linkProps,
        });
    }

    createLinkModel() {
        return new LinkAssociation(this.linkProps);
    }
}

export default PortAssociation;
