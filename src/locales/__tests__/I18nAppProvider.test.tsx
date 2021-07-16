import { render } from '@testing-library/react';
import React from 'react';
import I18nAppProvider from '../I18nAppProvider';
import { dynamicActivate } from '../i18n';

test('Test creating I18nAppProvider', () => {
    const i18n = jest.mock('../i18n');

    render(
        <I18nAppProvider locale="ru">
            <div>test</div>
        </I18nAppProvider>,
    );
});
