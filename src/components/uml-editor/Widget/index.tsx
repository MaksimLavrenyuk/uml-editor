import React, { DragEvent } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { observer } from 'mobx-react';
import style from './styles/Widget.module.scss';
import { NODE_CREATOR_EVENT_FORMAT } from '../ItemsCreator/constants';
import { ItemStruct } from '../items/types';
import { WidgetStore } from './WidgetStore';

export type WidgetProps = {
    widget: WidgetStore
};

/**
 * Component for rendering an widget diagram.
 *
 * @param props - React props.
 */
@observer
class Widget extends React.Component<WidgetProps> {
    private static dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    private widget: WidgetStore;

    constructor(props: WidgetProps) {
        super(props);
        this.widget = props.widget;
    }

    dropHandler = (event: DragEvent) => {
        const { widget } = this;
        const diagramEngine = widget.getDiagramEngine();
        const element: ItemStruct = JSON.parse(event.dataTransfer.getData(NODE_CREATOR_EVENT_FORMAT));

        widget.newNode(element, diagramEngine.getRelativeMousePoint(event));
    };

    render() {
        const {
            widget,
            dropHandler,
        } = this;

        return (
            <div
                className={style.widget}
                onDrop={dropHandler}
                onDragOver={Widget.dragOverHandler}
            >
                <CanvasWidget engine={widget.getDiagramEngine()} />
            </div>
        );
    }
}

export default Widget;
