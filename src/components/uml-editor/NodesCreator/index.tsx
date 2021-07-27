import List from '@material-ui/core/List';
import style from './styles/NodesCreator.module.scss';
import Node from './Node';

/**
 * Container with blocks to create new diagram nodes.
 *
 */
function NodesCreator() {
    return (
        <List className={style.container} component="nav" aria-label="main mailbox folders">
            <Node type="class" />
        </List>
    );
}

export default NodesCreator;
