import { Route } from 'react-router-dom';
import { RouteType } from '../config';
import LoadablePage from './loadable-page';

/**
 * Component for maintaining the desired router.
 *
 * @param route - An object that carries information about a particular router.
 */
function RouteItem(route: RouteType) {
    const { loadComponent, path, id } = route;

    return (
        <Route
            key={`${id}-route`}
            path={path}
            component={LoadablePage(loadComponent)}
        />
    );
}

export default RouteItem;
