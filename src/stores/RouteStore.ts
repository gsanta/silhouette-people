import { Route } from "../model/general/objs/Route";


export class RouteStore {

    private routes: Route[] = [];

    addRoute(route: Route) {
        this.routes.push(route);
    }

    getFinishedRoutes() {
        return this.getRoutes().filter(route => route.walker.isFinished());
    }

    getRoutes(): Route[] {
        return this.routes;
    }

    clearFinishedRoutes() {
        this.routes = this.getRoutes().filter(route => !route.walker.isFinished());
    }
}