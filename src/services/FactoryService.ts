import { World } from "./World";
import { GameObjectFactory } from "../core/factories/GameObjectFactory";
import { RouteFactory } from "../core/factories/RouteFactory";

export class FactoryService {

    readonly route: RouteFactory;

    constructor(world: World) {
        this.route = new RouteFactory();
    }
}