import { Switch } from 'react-router-dom';
import RouteList from './RouteList';
import ROUTES from '../config';

function RouteProvider() {
    return (
        <Switch>
            {RouteList(ROUTES)}
        </Switch>
    );
}

export default RouteProvider;
