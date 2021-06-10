import { AppLocales } from '../locales/types';

export interface AppType {
    getLocale(): AppLocales
    setLocale(locale: AppLocales): void
}
