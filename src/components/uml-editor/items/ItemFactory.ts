import { I18n } from '@lingui/core';
import ItemClass from './ItemClass';
import { ItemsFactoryI, ItemStruct } from './types';

class ItemFactory implements ItemsFactoryI {
    private readonly i18n: I18n;

    constructor(props: { i18n: I18n }) {
        this.i18n = props.i18n;
    }

    public createClass(): ItemStruct<'class'> {
        return new ItemClass({ i18n: this.i18n });
    }
}

export default ItemFactory;
