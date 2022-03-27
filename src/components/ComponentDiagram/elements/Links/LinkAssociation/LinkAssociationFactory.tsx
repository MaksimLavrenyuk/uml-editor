import * as React from 'react';
import LinkAssociation from './index';
import { LinkProps } from '../LinkBasic';
import LinkBasicFactory from '../LinkBasicFactory';
import LinkAssociationWidget from './LinkAssociationWidget';

export default class LinkAssociationFactory extends LinkBasicFactory<LinkAssociation> {
    constructor(props: LinkProps) {
        super(LinkAssociation.type, props);
    }

    generateModel(): LinkAssociation {
        return new LinkAssociation(this.linkProps);
    }

    generateReactWidget(event: { model: LinkAssociation }) {
        return (
            <g>
                <LinkAssociationWidget link={event.model} diagramEngine={this.engine} />
            </g>
        );
    }
}
