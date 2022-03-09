import { I18n } from '@lingui/core';
import { withI18n } from '@lingui/react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DragEvent, useCallback } from 'react';
import { diagramDragAndDropEvent } from '../elements/DiagramCanvas';
import { COMPONENTS_NAMES } from '../../../locales/lang-constants';
import ComponentType from '../../../models/ComponentType';

type ComponentProps = {
    i18n: I18n
    componentType: ComponentType
};

/**
 * Component list item. Initialiozation data transfer to <DiagramCanvas />.
 *
 * @param props - React props.
 * @see DiagramWidget
 */
function Component(props: ComponentProps) {
    const { componentType, i18n } = props;

    const dragStartHandler = useCallback((event: DragEvent) => {
        event.dataTransfer.setData(diagramDragAndDropEvent.ADD, String(componentType));
    }, [componentType]);

    return (
        <ListItem
            draggable
            onDragStart={dragStartHandler}
            button
        >
            <ListItemIcon>
                <DragIndicatorIcon />
            </ListItemIcon>
            <ListItemText primary={i18n._(COMPONENTS_NAMES[componentType])} />
        </ListItem>
    );
}

export default withI18n()(Component);
