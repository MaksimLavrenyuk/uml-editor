import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import AppStore from '../AppStore';

jest.mock('../AppStore');

const AppStoreMock = AppStore as jest.MockedClass<typeof AppStore>;

beforeEach(() => {
    AppStoreMock.mockClear();
});

test('Init store in app.', () => {
    render(<App />);

    expect(AppStoreMock).toHaveBeenCalledTimes(1);
});
