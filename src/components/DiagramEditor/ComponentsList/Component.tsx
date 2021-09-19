import { ComponentKind } from 'tplant/dist/Models/ComponentKind';
import { I18n } from '@lingui/core';
import { withI18n } from '@lingui/react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';
import { DragEvent, ReactNode, useCallback } from 'react';
import { diagramDragAndDropEvent } from '../Diagram/widgets/DiagramWidget';
import { COMPONENTS_NAMES } from '../../../locales/lang-constants';

type ComponentProps = {
    i18n: I18n
    icon: ReactNode
    componentKind: ComponentKind
};

/**
 * Component list item. Initialiozation data transfer to <DiagramWidget />.
 *
 * @param props - React props.
 * @see DiagramWidget
 */
function Component(props: ComponentProps) {
    const { componentKind, icon, i18n } = props;

    const dragStartHandler = useCallback((event: DragEvent) => {
        event.dataTransfer.setData(diagramDragAndDropEvent.ADD, String(componentKind));
    }, [componentKind]);

    return (
        <ListItem
            draggable
            onDragStart={dragStartHandler}
            button
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={i18n._(COMPONENTS_NAMES[componentKind])} />
        </ListItem>
    );
}

export default withI18n()(Component);
