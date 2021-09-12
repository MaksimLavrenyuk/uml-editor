import { useMemo } from 'react';
import { withI18n } from '@lingui/react';
import { I18n } from '@lingui/core';
import style from './styles/UmlEditor.module.scss';
import ItemsCreator from './ItemsCreator';
import Widget from './Widget';
import { WidgetStore } from './Widget/WidgetStore';
import ItemFactory from './items/ItemFactory';
import { ItemStruct } from './items/types';
import ItemClass from './items/ItemClass';
import ItemInterface from './items/ItemInterface';

type UmlEditorProps = {
    i18n: I18n
};

/**
 * Component for rendering an uml diagram.
 *
 * @param props - React props.
 */
function UmlEditor(props: UmlEditorProps) {
    const { i18n } = props;
    const widgetStore = useMemo(() => new WidgetStore({ i18n }), [i18n]);
    const itemsFactory = useMemo(() => new ItemFactory({ i18n }), [i18n]);
    const items: ItemStruct[] = useMemo(() => [
        new ItemClass({ i18n }),
        new ItemInterface({ i18n }),
    ], [i18n]);

    return (
        <>
            <div className={style.body}>
                <ItemsCreator items={items} factory={itemsFactory} />
                <Widget widget={widgetStore} />
            </div>
        </>
    );
}

export default withI18n()(UmlEditor);
