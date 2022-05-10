import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import * as React from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import LinkBasic, { LinkProps } from './LinkBasic';

const Keyframes = keyframes`
      from {
        stroke-dashoffset: 24;
      }
      to {
        stroke-dashoffset: 0;
      }
`;

const selected = css`
      stroke-dasharray: 10, 2;
      animation: ${Keyframes} 1s linear infinite;
`;

const Path = styled.path<{ selected: boolean }>`
      ${(p) => p.selected && selected};
      fill: none;
      pointer-events: auto;
`;

abstract class LinkBasicFactory<Link extends LinkBasic> extends AbstractReactFactory<
    Link,
    DiagramEngine
    > {
    protected linkProps: LinkProps;

    protected constructor(type: string, linkProps: LinkProps) {
        super(type);
        this.linkProps = linkProps;
    }

    abstract generateModel(): Link;

    abstract generateReactWidget(event: { model: Link }): JSX.Element;

    generateLinkSegment(model: Link, wasSelected: boolean, path: string) {
        return (
            <Path
                selected={wasSelected}
                stroke={wasSelected ? model.getOptions().selectedColor : model.getOptions().color}
                strokeWidth={model.getOptions().width}
                d={path}
            />
        );
    }
}

export default LinkBasicFactory;
