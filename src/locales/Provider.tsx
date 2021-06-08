import React, { useEffect } from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { defaultLocale, dynamicActivate } from './i18n';

type I18nAppProps = {
    children: React.ReactNode
};

const I18nApp = (props: I18nAppProps) => {
    const { children } = props;

    useEffect(() => {
        dynamicActivate(defaultLocale);
    }, []);

    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    );
};

export default I18nApp;
