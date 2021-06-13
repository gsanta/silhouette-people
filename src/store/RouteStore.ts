import { RouteItem } from "../model/objects/route/RouteItem";


export class RouteStore {

    private routes: RouteItem[] = [];

    addRoute(route: RouteItem) {
        this.routes.push(route);
    }

    getRoutes(): RouteItem[] {
        return this.routes;
    }

    getById(name: string) {
        return this.routes.find(route => route.id === name);
    }
    
    deleteRoute(route: RouteItem) {
        this.routes = this.getRoutes().filter(r => r !== route);
    }
}