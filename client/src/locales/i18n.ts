import { i18n } from '@lingui/core';
import { en, ru } from 'make-plural/plurals';

export type AppLocales = 'ru' | 'en';

export const locales = {
    en: 'English',
    ru: 'Russian',
};

i18n.loadLocaleData({
    en: { plurals: en },
    ru: { plurals: ru },
});

/**
 * Function for dynamically loading application locales.
 *
 * @param locale - Using locales in app.
 */
export async function dynamicActivate(locale: AppLocales) {
    const { messages } = await import(`./${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}
