import { DragEvent, ReactNode } from 'react';
import { I18n } from '@lingui/core';
import { ItemsFactoryI, ItemStruct, ItemType } from '../items/types';

export type ItemProps = {
    name: string
    type: ItemType
    icon: ReactNode
    factory: ItemsFactoryI
};

export type ItemsCreatorProps = {
    factory: ItemsFactoryI
    items: ItemStruct[]
};
