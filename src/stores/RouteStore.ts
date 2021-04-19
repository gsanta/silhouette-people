import { RouteObj } from "../model/general/objs/RouteObj";


export class RouteStore {

    private routes: RouteObj[] = [];

    addRoute(route: RouteObj) {
        this.routes.push(route);
    }

    getFinishedRoutes() {
        return this.getRoutes().filter(route => route.walker.isFinished());
    }

    getRoutes(): RouteObj[] {
        return this.routes;
    }

    clearFinishedRoutes() {
        this.routes = this.getRoutes().filter(route => !route.walker.isFinished());
    }
}