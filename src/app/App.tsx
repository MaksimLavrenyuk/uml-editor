import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import logo from '../assets/logo.svg';
import './styles/App.css';
import AppStore from './AppStore';
import I18nAppProvider from '../locales/I18nAppProvider';

function App() {
    const app = useMemo(() => new AppStore(), []);

    return (
        <I18nAppProvider locale={app.getLocale()}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit
                        {' '}
                        <code>src/App.tsx</code>
                        {' '}
                        and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </I18nAppProvider>
    );
}

export default observer(App);
