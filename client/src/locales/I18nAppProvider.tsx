import React, { useEffect } from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { dynamicActivate, AppLocales } from './i18n';

type I18nAppProviderProps = {
    children: React.ReactNode
    locale: AppLocales
};

const I18nAppProvider = (props: I18nAppProviderProps) => {
    const { children, locale } = props;

    useEffect(() => {
        (async function () {
            await dynamicActivate(locale);
        }());
    }, [locale]);

    return (
        <>
            <I18nProvider i18n={i18n}>
                {children}
            </I18nProvider>
        </>
    );
};

export default I18nAppProvider;
