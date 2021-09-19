import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/Inbox';
import { ComponentKind } from 'tplant/dist/Models/ComponentKind';
import classes from './ComponentsList.module.scss';
import Component from './Component';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

/**
 * Component for the list of elements used in the language, such as Class, Interface.
 * By dragging and dropping such elements on the canvas, you can create new diagram nodes.
 */
function ComponentsList() {
    const styles = useStyles();
    const components = useMemo(() => [
        {
            componentKind: ComponentKind.CLASS,
            icon: <InboxIcon />,
        },
        {
            componentKind: ComponentKind.INTERFACE,
            icon: <InboxIcon />,
        },
        {
            componentKind: ComponentKind.ENUM,
            icon: <InboxIcon />,
        },
        {
            componentKind: ComponentKind.NAMESPACE,
            icon: <InboxIcon />,
        },
    ], []);

    return (
        <AppBar color="default" className={classes.list}>
            <List className={styles.root} component="nav" aria-label="main mailbox folders">
                {components.map((component) => (
                    <Component
                        key={component.componentKind}
                        componentKind={component.componentKind}
                        icon={<InboxIcon />}
                    />
                ))}
            </List>
        </AppBar>
    );
}

export default ComponentsList;
