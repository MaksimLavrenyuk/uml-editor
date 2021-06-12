import { Route } from 'react-router-dom';
import { RouteType } from '../config/types';
import LoadableComponent from '../../components/loadable-component';

function RouteItem(route: RouteType) {
    const { loadComponent, path, id } = route;

    return (
        <Route
            key={`${id}-route`}
            path={path}
            component={LoadableComponent(loadComponent)}
        />
    );
}

export default RouteItem;
