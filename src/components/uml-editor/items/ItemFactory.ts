import { I18n } from '@lingui/core';
import ItemClass from './ItemClass';
import { ItemsFactoryI } from './types';
import ItemInterface from './ItemInterface';

class ItemFactory implements ItemsFactoryI {
    private readonly i18n: I18n;

    public create: ItemsFactoryI['create'];

    constructor(props: { i18n: I18n }) {
        this.i18n = props.i18n;

        this.create = {
            class: () => new ItemClass({ i18n: this.i18n }),
            interface: () => new ItemInterface({ i18n: this.i18n }),
        };
    }
}

export default ItemFactory;
