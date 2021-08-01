import * as React from 'react';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import { DiamondNodeModel } from './DiamondNodeModel';
import style from './styles/widget.module.scss';

export interface DiamondNodeWidgetProps {
    node: DiamondNodeModel;
    engine: DiagramEngine;
    size?: number;
}

/**
 * Custom node.
 *
 * @param props - React node.
 */
function DiamondNodeWidget(props: DiamondNodeWidgetProps) {
    const { size = 0, node, engine } = props;
    const portLeft = node.getPort(PortModelAlignment.LEFT);
    const portRight = node.getPort(PortModelAlignment.RIGHT);
    const portTop = node.getPort(PortModelAlignment.TOP);
    const portBottom = node.getPort(PortModelAlignment.BOTTOM);

    return (
        <div
            className="diamond-node"
            style={{
                position: 'relative',
                width: size,
                height: size,
            }}
        >
            <svg
                width={size}
                height={size}
                dangerouslySetInnerHTML={{
                    __html: `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="mediumpurple" stroke="${
        node.isSelected() ? 'white' : '#000000'
        }" stroke-width="3" stroke-miterlimit="10" points="10,${
            size / 2
        } ${
            size / 2
        },10 ${
            size - 10
        },${
            size / 2
        } ${
            size / 2
        },${
            size - 10
        } "/>
          </g>
        `,
                }}
            />
            {portLeft && (
                <PortWidget
                    style={{
                        top: size / 2 - 8,
                        left: -8,
                        position: 'absolute',
                    }}
                    port={portLeft}
                    engine={engine}
                >
                    <div className={style.port} />
                </PortWidget>
            )}
            {portTop && (
                <PortWidget
                    style={{
                        left: size / 2 - 8,
                        top: -8,
                        position: 'absolute',
                    }}
                    port={portTop}
                    engine={engine}
                >
                    <div className={style.port} />
                </PortWidget>
            )}
            {portRight && (
                <PortWidget
                    style={{
                        left: size - 8,
                        top: size / 2 - 8,
                        position: 'absolute',
                    }}
                    port={portRight}
                    engine={engine}
                >
                    <div className={style.port} />
                </PortWidget>
            )}
            {portBottom && (
                <PortWidget
                    style={{
                        left: size / 2 - 8,
                        top: size - 8,
                        position: 'absolute',
                    }}
                    port={portBottom}
                    engine={engine}
                >
                    <div className={style.port} />
                </PortWidget>
            )}
        </div>
    );
}

export default DiamondNodeWidget;
