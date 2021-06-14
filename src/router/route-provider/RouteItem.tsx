import { Route } from 'react-router-dom';
import { RouteType } from '../config/types';
import LoadablePage from './loadable-page';

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
