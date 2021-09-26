import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/Inbox';
import classes from './ComponentsList.module.scss';
import Component from './Component';
import ComponentType from '../../../models/ComponentType';

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
            componentType: ComponentType.CLASS,
            icon: <InboxIcon />,
        },
        {
            componentType: ComponentType.INTERFACE,
            icon: <InboxIcon />,
        },
    ], []);

    return (
        <AppBar color="default" className={classes.list}>
            <List className={styles.root} component="nav" aria-label="main mailbox folders">
                {components.map((component) => (
                    <Component
                        key={component.componentType}
                        componentType={component.componentType}
                        icon={<InboxIcon />}
                    />
                ))}
            </List>
        </AppBar>
    );
}

export default ComponentsList;
