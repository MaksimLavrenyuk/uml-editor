import { useMemo } from 'react';
import { AppBar, List } from '@mui/material';
import { Inbox } from '@mui/icons-material';
import classes from './ComponentsList.module.scss';
import Component from './Component';
import ComponentType from '../../../models/ComponentType';

/**
 * Component for the list of elements used in the language, such as Class, Interface.
 * By dragging and dropping such elements on the canvas, you can create new diagram nodes.
 */
function ComponentsList() {
    const components = useMemo(() => [
        {
            componentType: ComponentType.CLASS,
            icon: <Inbox />,
        },
        {
            componentType: ComponentType.INTERFACE,
            icon: <Inbox />,
        },
    ], []);

    return (
        <div className={classes.list}>
            <span>example string</span>
            <AppBar color="default">
                <List component="nav" aria-label="main mailbox folders">
                    {components.map((component) => (
                        <Component
                            key={component.componentType}
                            componentType={component.componentType}
                            icon={<Inbox />}
                        />
                    ))}
                </List>
            </AppBar>
        </div>
    );
}

export default ComponentsList;
