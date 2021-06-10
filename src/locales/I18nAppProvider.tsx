import React, { useEffect } from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { dynamicActivate } from './i18n';
import { I18nAppProviderProps } from './types';

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
