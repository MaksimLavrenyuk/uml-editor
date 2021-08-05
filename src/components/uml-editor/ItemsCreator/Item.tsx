import { DragEvent, useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';
import { ItemProps } from './types';
import { NODE_CREATOR_EVENT_FORMAT } from './constants';

/**
 * Block to create a diagram node.
 *
 * @param props - React props.
 */
function Item(props: ItemProps) {
    const {
        icon, name, factory, type,
    } = props;

    const dragStartHandler = useCallback((event: DragEvent) => {
        event.dataTransfer.setData(NODE_CREATOR_EVENT_FORMAT, JSON.stringify(factory.create[type]()));
    }, [factory.create, type]);

    return (
        <ListItem
            draggable
            onDragStart={dragStartHandler}
            button
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    );
}

export default Item;
