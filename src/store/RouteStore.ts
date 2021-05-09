import { CharacterItem } from "../model/item/character/CharacterItem";
import { RouteItem } from "../model/item/route/RouteItem";


export class RouteStore {

    private routes: RouteItem[] = [];

    addRoute(route: RouteItem) {
        this.routes.push(route);
    }

    getFinishedRoutes() {
        return this.getRoutes().filter(route => route.walker.isFinished());
    }

    getRoutes(): RouteItem[] {
        return this.routes;
    }

    getByName(name: string) {
        return this.routes.find(route => route.name === name);
    }

    getRouteForCharacter(character: CharacterItem): RouteItem {
        return this.routes.find(route => route.character === character);
    }

    clearFinishedRoutes() {
        this.routes = this.getRoutes().filter(route => !route.walker.isFinished());
    }

    deleteRoute(route: RouteItem) {
        route.dispose();
        this.routes = this.getRoutes().filter(r => r !== route);
    }
}