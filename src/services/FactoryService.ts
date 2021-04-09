import { Lookup } from "./Lookup";
import { GameObjectFactory } from "./factory/GameObjectFactory";
import { RouteFactory } from "./factory/RouteFactory";

export class FactoryService {

    readonly route: RouteFactory;

    constructor(world: Lookup) {
        this.route = new RouteFactory();
    }
}