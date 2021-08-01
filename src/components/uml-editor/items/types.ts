import { I18n } from '@lingui/core';

export type ItemType = 'class' | 'interface';

export type ItemStruct<Type extends ItemType = ItemType> = {
    type: Type
    name: string
};

export type ItemProps = {
    i18n: I18n
};

export interface ItemsFactoryI {
    createClass(): ItemStruct<'class'>
}
