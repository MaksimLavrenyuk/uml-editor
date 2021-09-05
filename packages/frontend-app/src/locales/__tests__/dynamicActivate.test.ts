import { i18n } from '@lingui/core';
import { dynamicActivate } from '../i18n';

test('load i18n locale', async () => {
    i18n.load = jest.fn();
    i18n.activate = jest.fn();

    await dynamicActivate('ru');

    expect(i18n.load).toHaveBeenCalledTimes(1);
    expect(i18n.activate).toHaveBeenCalledTimes(1);
});
