import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import Link from '../models/Link';
import LinkSegmentWidget from '../widgets/NodeWidgets/LinkSegmentWidget';

export default class LinkFactory extends DefaultLinkFactory {
    constructor() {
        super('default');
    }

    generateModel(): Link {
        return new Link();
    }

    generateLinkSegment(model: Link, selected: boolean, path: string) {
        return (
            <g>
                <LinkSegmentWidget model={model} path={path} />
            </g>
        );
    }
}
