import PortBasic, { PortProps } from '../PortBasic';
import LinkExtends from '../../Links/LinkExtends';

type PortExtendsProps = {
    name: string,
} & PortProps;

class PortExtends extends PortBasic {
    static type = 'PortExtends';

    constructor(props: PortExtendsProps) {
        super({
            type: PortExtends.type,
            name: props.name,
            linkProps: props.linkProps,
        });
    }

    createLinkModel() {
        return new LinkExtends(this.linkProps);
    }
}

export default PortExtends;
