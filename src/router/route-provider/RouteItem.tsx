import { Route } from 'react-router-dom';
import { RouteType } from '../config/types';
import LoadableComponent from '../../components/loadable-component';

function RouteItem(route: RouteType) {
    const { component, path } = route;

    return (
        <Route
            key={`${component}-route`}
            path={path}
            component={LoadableComponent(component)}
        />
    );
}

export default RouteItem;
