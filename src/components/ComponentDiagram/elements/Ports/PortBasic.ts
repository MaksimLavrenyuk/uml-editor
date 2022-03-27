import { PortModel } from '@projectstorm/react-diagrams';
import LinkBasic, { LinkProps } from '../Links/LinkBasic';

export type PortProps = {
    linkProps: LinkProps
};

type PortBasicProps = {
    type: string,
    name: string,
} & PortProps;

abstract class PortBasic extends PortModel {
    protected linkProps: LinkProps;

    protected constructor(props: PortBasicProps) {
        super({
            type: props.type,
            name: props.name,
        });

        this.linkProps = props.linkProps;
    }

    abstract createLinkModel(): LinkBasic;
}

export default PortBasic;
