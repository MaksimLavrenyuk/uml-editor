import { useMemo } from 'react';
import { AppBar, List } from '@mui/material';
import classes from './ComponentsList.module.scss';
import Component from './Component';
import ComponentType from '../../../models/ComponentType';

/**
 * Component for the list of elements used in the language, such as Class, Interface.
 * By dragging and dropping such elements on the canvas, you can create new diagram nodes.
 */
function ComponentsList() {
    const components = useMemo(() => [
        ComponentType.CLASS,
        ComponentType.INTERFACE,
    ], []);

    return (
        <AppBar color="default" className={classes.container}>
            <List component="nav" aria-label="main mailbox folders">
                {components.map((component) => (
                    <Component
                        key={component}
                        componentType={component}
                    />
                ))}
            </List>
        </AppBar>
    );
}

export default ComponentsList;
