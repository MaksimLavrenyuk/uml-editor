import { t } from '@lingui/macro';
import { ItemProps, ItemStruct } from './types';

class ItemInterface implements ItemStruct {
    public type: 'interface';

    public name: string;

    constructor(props: ItemProps) {
        this.type = 'interface';
        this.name = props.i18n._(t`NODE_TYPE_INTERFACE`);
    }
}

export default ItemInterface;
