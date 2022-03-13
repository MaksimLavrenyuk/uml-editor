import React, { ReactNode } from 'react';
import AddBtn from './AddBtn';
import classes from './PropertiesWrapper.module.scss';
import Label from './Label';

type PropertiesProps = {
    properties: ReactNode[]
    onAdd(): void
};

type HeaderProps = {
    children: ReactNode
};

const Header = React.memo((props: HeaderProps) => {
    const { children } = props;
    return (
        <div className={classes.header}>
            {children}
        </div>
    );
});

function PropertiesWrapper(props: PropertiesProps) {
    const { properties, onAdd } = props;

    return (
        <div className={classes.fields}>
            <Header>
                <Label />
                <AddBtn onClick={onAdd} />
            </Header>
            {properties}
        </div>
    );
}

export default React.memo(PropertiesWrapper);
