import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import './styles/App.css';
import AppStore from './AppStore';
import I18nAppProvider from '../locales/I18nAppProvider';
import RouteProvider from '../router/route-provider';

function App() {
    const app = useMemo(() => new AppStore(), []);

    return (
        <I18nAppProvider locale={app.getLocale()}>
            <RouteProvider />
        </I18nAppProvider>
    );
}

export default observer(App);
