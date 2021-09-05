import { Switch } from 'react-router-dom';
import RouteList from './RouteList';
import ROUTES from '../config';

/**
 * A component that implements client routing in the application.
 */
function RouteProvider() {
    return (
        <Switch>
            <RouteList list={ROUTES} />
        </Switch>
    );
}

export default RouteProvider;
