import LinkBasic, { LinkProps } from '../LinkBasic';

export default class LinkExtends extends LinkBasic {
    static readonly type = 'LinkExtends';

    constructor(props: LinkProps) {
        super({
            ...props,
            type: LinkExtends.type,
        });
    }
}
