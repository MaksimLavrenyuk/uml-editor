import { RouteType } from '../config/types';

export type RouteListProps = {
    list: RouteType[]
};

export type LoadFn = () => Promise<{readonly default: () => JSX.Element}>;
