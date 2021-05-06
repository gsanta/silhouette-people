import { RouteObj } from "../../model/object/route/RouteObj";


export class RoutePool {
    
    private routes: RouteObj[] = [];

    addRoute(route: RouteObj) {
        this.routes.push(route);
    }

    getRoute(): RouteObj {
        return this.routes[0];
    }
}