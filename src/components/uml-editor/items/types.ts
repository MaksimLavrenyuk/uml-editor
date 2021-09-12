import { I18n } from '@lingui/core';

export type ItemType = 'class' | 'interface';

export type ItemProps = {
    i18n: I18n
};

export type ItemStruct<Type extends ItemType = ItemType> = {
    type: Type
    name: string
};

export interface ItemsFactoryI {
    create: Creators
}

export type Creators = {
    [key in ItemType]: () => ItemStruct<key>;
};
