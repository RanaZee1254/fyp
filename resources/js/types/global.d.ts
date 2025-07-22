import 'ziggy-js';
import { RouteParamsWithQueryOverload, RouteName } from 'ziggy-js';

declare global {
    const route: (
        name: RouteName,
        params?: RouteParamsWithQueryOverload,
        absolute?: boolean
    ) => string;
}

export {};