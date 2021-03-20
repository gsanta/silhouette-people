import { World } from "../model/World";
import { GameObjectFactory } from "../core/factories/GameObjectFactory";
import { RouteFactory } from "../core/factories/RouteFactory";

export class FactoryService {

    readonly gameObject: GameObjectFactory;
    readonly route: RouteFactory;

    constructor(world: World) {
        this.gameObject = new GameObjectFactory(world);
        this.route = new RouteFactory();
    }
}