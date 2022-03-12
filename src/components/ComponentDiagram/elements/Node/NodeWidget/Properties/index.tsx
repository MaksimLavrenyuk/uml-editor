import React, { ReactNode } from 'react';
import AddBtn from './AddBtn';
import classes from './Properties.module.scss';
import Label from './Label';

type FieldsProps = {
    onAdd(): void
    onRemove(fieldId: string): void
    getFields(): ({ name: string, id: string })[]
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

function Properties(props: FieldsProps) {
    const { onAdd, getFields, onRemove } = props;
    const fields = getFields();

    return (
        <div className={classes.fields}>
            {fields.length === 0 && (
                <Header>
                    <Label />
                    <AddBtn onClick={onAdd} />
                </Header>
            )}
            {fields.length > 0 && (
                <>
                    <Header>
                        <Label />
                    </Header>
                    <AddBtn onClick={onAdd} />
                </>
            )}
        </div>
    );
}

export default React.memo(Properties);
