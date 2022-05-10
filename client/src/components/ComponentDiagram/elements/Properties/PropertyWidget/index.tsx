import React, { KeyboardEvent, ReactNode, useCallback } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import { observer } from 'mobx-react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import classes from './Property.module.scss';
import EditableDiv from '../../../../EditableDiv';
import PropertyBasic from '../Property';
import PortAssociation from '../../Ports/PortAssociation';
import PortAssociationWidget from '../../Ports/PortAssociation/PortAssociationWidget';

type PropertyWidgetProps = {
    property: PropertyBasic
    returnTypePort: PortAssociation
    diagramEngine: DiagramEngine,
    children: ReactNode
};

function PropertyWidget(props: PropertyWidgetProps) {
    const {
        property, returnTypePort, diagramEngine, children,
    } = props;

    const changeNameHandler = useCallback((event: ContentEditableEvent) => {
        property.changeName(event.target.value);
    }, [property]);

    const keyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.nativeEvent.stopPropagation();
        }
    }, []);

    return (
        <div className={classes.property}>
            {children}
            <EditableDiv
                className={classes.propertyName}
                onKeyDown={keyDownHandler}
                html={property.name()}
                onChange={changeNameHandler}
            />
            <PortAssociationWidget
                port={returnTypePort}
                diagramEngine={diagramEngine}
            />
        </div>
    );
}

export default observer(PropertyWidget);
