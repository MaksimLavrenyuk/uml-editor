import List from '@material-ui/core/List';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/Inbox';
import style from './styles/NodesCreator.module.scss';
import Item from './Item';
import { ItemsFactoryI, ItemStruct } from '../items/types';

export type ItemsCreatorProps = {
    factory: ItemsFactoryI
    items: ItemStruct[]
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

/**
 * Container with blocks to create new diagram nodes.
 *
 * @param props - React props.
 */
function ItemsCreator(props: ItemsCreatorProps) {
    const classes = useStyles();
    const { items, factory } = props;

    return (
        <AppBar color="default" className={style.container}>
            <List className={classes.root} component="nav" aria-label="main mailbox folders">
                {items.map((item) => (
                    <Item
                        key={item.type}
                        factory={factory}
                        type={item.type}
                        name={item.name}
                        icon={<InboxIcon />}
                    />
                ))}
            </List>
        </AppBar>
    );
}

export default ItemsCreator;
