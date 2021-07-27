import { ItemProps } from './types';
import NodeClass from './NodeClass';

/**
 * Block to create a diagram node.
 *
 * @param props - React props.
 */
function Node(props: ItemProps) {
    const { type } = props;

    switch (type) {
    case 'class':
        return <NodeClass />;

    default:
        return null;
    }
}

export default Node;
