import loadable from '@loadable/component';
import React from 'react';
import Loading from './Loading';

type LoadFn = () => Promise<{readonly default: () => JSX.Element}>;

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
