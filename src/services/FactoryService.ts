import { World } from "./World";
import { GameObjectFactory } from "./factory/GameObjectFactory";
import { RouteFactory } from "./factory/RouteFactory";

export class FactoryService {

    readonly route: RouteFactory;

    constructor(world: World) {
        this.route = new RouteFactory();
    }
}