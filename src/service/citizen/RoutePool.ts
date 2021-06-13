import { RouteItem } from "../../model/objects/route/RouteItem";


export class RoutePool {
    
    private routes: RouteItem[] = [];

    addRoute(route: RouteItem) {
        this.routes.push(route);
    }

    getRoute(): RouteItem {
        return this.routes[0];
    }
}