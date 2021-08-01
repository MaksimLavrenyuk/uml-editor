import * as React from 'react';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import ContentEditable from 'react-contenteditable';
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
            style={{
                position: 'relative',
                width: size,
                height: size,
            }}
        >
            <ContentEditable html={node.name} onChange={() => console.log('vfv')} />
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
