import { CharacterObj } from "../model/object/character/CharacterObj";
import { RouteObj } from "../model/object/route/RouteObj";


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

    getRouteForCharacter(character: CharacterObj): RouteObj {
        return this.routes.find(route => route.character === character);
    }

    clearFinishedRoutes() {
        this.routes = this.getRoutes().filter(route => !route.walker.isFinished());
    }
}