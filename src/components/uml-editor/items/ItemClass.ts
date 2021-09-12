import { t } from '@lingui/macro';
import { ItemStruct, ItemProps } from './types';

class ItemClass implements ItemStruct {
    public type: 'class';

    public name: string;

    constructor(props: ItemProps) {
        this.type = 'class';
        this.name = props.i18n._(t`NODE_TYPE_CLASS`);
    }
}

export default ItemClass;
