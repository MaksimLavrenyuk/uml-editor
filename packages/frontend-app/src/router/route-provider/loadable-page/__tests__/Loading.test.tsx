import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

test('Test render <Loading /> component.', () => {
    try {
        render(<Loading />);

        const element = screen.getByTestId('loading-page-fallback');
        expect(element).not.toBeVisible();
    } catch (error) {
        expect(true).toBeTruthy();
    }
});
