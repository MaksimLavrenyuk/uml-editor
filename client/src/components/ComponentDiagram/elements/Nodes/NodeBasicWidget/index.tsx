import React, { ReactNode } from 'react';
import classes from './NodeWidget.module.scss';
import Content from './Content';

type NodeWidgetProps = {
    selected: boolean
    header: ReactNode
    content: ReactNode
    portTop: ReactNode
    portBottom: ReactNode
};

/**
 * Basic widget of the diagram node display.
 *
 * @param props - React props.
 */
function NodeWidget(props: NodeWidgetProps) {
    const {
        selected, header, content, portTop, portBottom,
    } = props;

    return (
        <div className={classes.node}>
            {portTop}
            <Content
                selected={selected}
                header={header}
            >
                {content}
            </Content>
            {portBottom}
        </div>
    );
}

export default React.memo(NodeWidget);
