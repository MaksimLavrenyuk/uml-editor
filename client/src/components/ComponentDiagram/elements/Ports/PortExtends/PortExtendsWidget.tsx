import React from 'react';
import { t } from '@lingui/macro';
import PortBasicWidget, { PortWidgetProps } from '../PortBasicWidget';
import classes from './PortExtends.module.scss';

function PortExtendsWidget(props: PortWidgetProps) {
    const { port, diagramEngine, className = '' } = props;

    return (
        <PortBasicWidget className={`${classes.portExtends} ${className}`} port={port} diagramEngine={diagramEngine}>
            {t`COMPONENT_EXTENDS`}
        </PortBasicWidget>
    );
}

export default React.memo(PortExtendsWidget);
