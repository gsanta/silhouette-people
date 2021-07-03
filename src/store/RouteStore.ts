import { GameObject } from "../model/objects/game_object/GameObject";
import { RouteJson } from "../model/objects/route/RouteItem";


export class RouteStore {

    private routes: RouteJson[] = [];

    addRoute(route: RouteJson) {
        this.routes.push(route);
    }

    getRoutes(): RouteJson[] {
        return this.routes;
    }

    getByGameObject(gameObject: GameObject) {
        return this.routes.find(route => route.gameObjectId === gameObject.id);
    }
    
    deleteRoute(route: RouteJson) {
        this.routes = this.getRoutes().filter(r => r !== route);
    }
}