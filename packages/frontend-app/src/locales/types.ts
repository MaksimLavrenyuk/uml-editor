import React from 'react';

type AppLocales = 'ru' | 'en';

type I18nAppProviderProps = {
    children: React.ReactNode
    locale: AppLocales
};

export type {
    AppLocales,
    I18nAppProviderProps,
};
