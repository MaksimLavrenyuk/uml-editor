import { i18n } from '@lingui/core';
import { en, ru } from 'make-plural/plurals';

export const locales = {
    en: 'English',
    ru: 'Russian',
};

i18n.loadLocaleData({
    en: { plurals: en },
    ru: { plurals: ru },
});

export async function dynamicActivate(locale: string) {
    const { messages } = await import(`./${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}
