import * as React from 'react';
import LinkExtends from './index';
import { LinkProps } from '../LinkBasic';
import LinkBasicFactory from '../LinkBasicFactory';
import LinkExtendsWidget from './LinkExtendsWidget';

export default class LinkExtendsFactory extends LinkBasicFactory<LinkExtends> {
    constructor(props: LinkProps) {
        super(LinkExtends.type, props);
    }

    generateModel(): LinkExtends {
        return new LinkExtends(this.linkProps);
    }

    generateReactWidget(event: { model: LinkExtends }) {
        return (
            <g>
                <LinkExtendsWidget link={event.model} diagramEngine={this.engine} />
            </g>
        );
    }
}
