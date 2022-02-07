import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export default class Link extends DefaultLinkModel {
    constructor() {
        super({
            type: 'NodeLink',
        });
    }
}
