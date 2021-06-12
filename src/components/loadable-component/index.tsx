import loadable from '@loadable/component';
import * as React from 'react';
import Loading from './Loading';

/**
 * Lazy loading component
 * @constructor
 * @param loadFn
 */
function LoadableComponent(loadFn: () => Promise<{readonly default: () => JSX.Element}>) {
    return (
        loadable(loadFn, {
            fallback: <Loading />,
        })
    );
}

export default LoadableComponent;
