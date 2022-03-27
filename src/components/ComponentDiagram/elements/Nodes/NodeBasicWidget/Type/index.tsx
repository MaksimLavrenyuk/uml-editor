import React from 'react';
import ComponentType from '../../../../../../models/ComponentType';
import classes from './Type.module.scss';

type TypeProps = {
    type: ComponentType
};

function Type(props: TypeProps) {
    const { type } = props;

    return (
        <span className={classes.type}>{type.toLowerCase()}</span>
    );
}

export default React.memo(Type);
