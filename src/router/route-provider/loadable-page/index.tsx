import loadable from '@loadable/component';
import React from 'react';
import pMinDelay from 'p-min-delay';
import Loading from './Loading';

/**
 * Lazy loading component for load page.
 *
 * @param loadFn - Function for load Page component.
 */
function LoadablePage(loadFn: () => Promise<{readonly default: () => JSX.Element}>) {
    return (
        loadable(() => pMinDelay(loadFn(), 300), {
            fallback: <Loading />,
        })
    );
}

export default LoadablePage;
