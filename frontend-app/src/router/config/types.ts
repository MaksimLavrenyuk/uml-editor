type RouteType = {
    id: string
    path: string
    name: string,
    loadComponent(): Promise<{readonly default: () => JSX.Element}>,
    routes?: RouteType[]
};

export type {
    RouteType,
};
