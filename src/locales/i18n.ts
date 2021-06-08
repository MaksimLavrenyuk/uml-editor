import { i18n } from '@lingui/core';

export const locales = {
    en: 'English',
    ru: 'Russian',
};
export const defaultLocale = 'ru';

export async function dynamicActivate(locale: string) {
    const { messages } = await import(`./${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}
