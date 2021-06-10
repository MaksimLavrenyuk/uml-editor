type RouteType = {
    path: string
    name: string,
    component: string
    routes?: RouteType[]
};

export type {
    RouteType,
};
