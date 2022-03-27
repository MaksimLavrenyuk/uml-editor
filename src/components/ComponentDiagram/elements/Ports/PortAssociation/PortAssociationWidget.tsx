import React from 'react';
import PortBasicWidget, { PortWidgetProps } from '../PortBasicWidget';

function PortAssociationWidget(props: PortWidgetProps) {
    const { port, diagramEngine } = props;

    return (
        <PortBasicWidget port={port} diagramEngine={diagramEngine} />
    );
}

export default React.memo(PortAssociationWidget);
