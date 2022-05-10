export type RouteType = {
    id: string
    path: string
    name: string,
    loadComponent(): Promise<{readonly default: () => JSX.Element}>,
    routes?: RouteType[]
};

const ROUTES: RouteType[] = [
    {
        id: 'main-page',
        path: '/',
        name: 'ROUTER_NAME_MAIN',
        loadComponent: () => import('../../pages/main'),
    },
];

export default ROUTES;
