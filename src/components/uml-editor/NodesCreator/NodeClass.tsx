import { DragEventHandler, useCallback } from 'react';
import { Trans } from '@lingui/macro';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ItemStruct } from './types';
import { NODE_CREATOR_EVENT_FORMAT } from './constants';

const NODE_CLASS_DEFAULT_DATA: ItemStruct = { type: 'class' };

/**
 * Block to create a node of the diagram class.
 */
function NodeClass() {
    const dragStartHandler: DragEventHandler = useCallback((event) => {
        event.dataTransfer.setData(NODE_CREATOR_EVENT_FORMAT, JSON.stringify(NODE_CLASS_DEFAULT_DATA));
    }, []);

    return (
        <ListItem
            draggable
            onDragStart={dragStartHandler}
            button
        >
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={<Trans>NODE_TYPE_CLASS</Trans>} />
        </ListItem>
    );
}

export default NodeClass;
