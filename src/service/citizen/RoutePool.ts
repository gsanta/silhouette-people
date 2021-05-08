import { RouteItem } from "../../model/item/route/RouteItem";


export class RoutePool {
    
    private routes: RouteItem[] = [];

    addRoute(route: RouteItem) {
        this.routes.push(route);
    }

    getRoute(): RouteItem {
        return this.routes[0];
    }
}