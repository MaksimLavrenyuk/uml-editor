import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadablePage from '../index';
import { LoadFn } from '../../types';

const TEXT = 'test';
const Component = () => <div>{TEXT}</div>;

jest.mock('@loadable/component', () => ({
    __esModule: true,
    default: Component,
}));

test('Test render <LoadablePage /> component.', () => {
    const pageLoaded: LoadFn = () => new Promise(() => Component);
    const page = LoadablePage(pageLoaded) as unknown as JSX.Element;

    render(page);

    const element = screen.queryByText(TEXT);
    expect(element).toBeTruthy();
});
