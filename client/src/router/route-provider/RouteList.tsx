import { ReactNode } from 'react';
import { RouteType } from '../config';
import RouteItem from './RouteItem';

type RouteListProps = {
    list: RouteType[]
};

/**
 * The function of generating RouteItem a list of serviced routers.
 *
 * @param list - List of serviced routers.
 * @see RouteItem
 */
function getRouteList(list: RouteType[]) {
    const result: ReactNode[] = [];

    list.forEach((item) => {
        if (item.routes) {
            result.push(...getRouteList(item.routes));
        }

        result.push(RouteItem(item));
    });

    return result;
}

/**
 * Component for creating a list of all routes in the application.
 *
 * @param props - The object that carries all the information to create a routes list.
 */
function RouteList(props: RouteListProps) {
    const { list } = props;

    return (
        <>
            {getRouteList(list)}
        </>
    );
}

export default RouteList;
