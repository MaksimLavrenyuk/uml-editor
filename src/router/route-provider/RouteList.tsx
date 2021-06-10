import { RouteType } from '../config/types';
import RouteItem from './RouteItem';

function RouteList(list: RouteType[]) {
    const result: JSX.Element[] = [];

    list.forEach((item) => {
        if (item.routes) {
            result.push(...RouteList(item.routes));
        }

        result.push(RouteItem(item));
    });

    return result;
}

export default RouteList;
