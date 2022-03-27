import LinkBasic, { LinkProps } from '../LinkBasic';

export default class LinkAssociation extends LinkBasic {
    static readonly type = 'LinkAssociation';

    constructor(props: LinkProps) {
        super({
            ...props,
            type: LinkAssociation.type,
        });
    }
}
