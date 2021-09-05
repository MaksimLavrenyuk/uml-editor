import loadable from '@loadable/component';
import React from 'react';
import Loading from './Loading';
import { LoadFn } from '../types';

/**
 * Lazy loading component for load page.
 *
 * @param loadFn - Function for load Page component.
 */
function LoadablePage(loadFn: LoadFn) {
    return (
        loadable(loadFn, {
            fallback: <Loading />,
        })
    );
}

export default LoadablePage;
