import React from 'react';

type AppLocales = 'ru' | 'en';

type I18nAppProviderProps = {
    children: React.ReactNode
    locale: AppLocales
};

type Constant = {
    [key: string]: string
};

export type {
    AppLocales,
    I18nAppProviderProps,
    Constant,
};
