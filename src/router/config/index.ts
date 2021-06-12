import { RouteType } from './types';

const ROUTES: RouteType[] = [
    {
        id: 'main-page',
        path: '/main',
        name: 'ROUTER_NAME_MAIN',
        loadComponent: () => import('../../pages/main'),
    },
];

export default ROUTES;
