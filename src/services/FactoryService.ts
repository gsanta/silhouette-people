import { Lookup } from "./Lookup";
import { ItemObjFactory } from "./factory/ItemObjFactory";
import { RouteFactory } from "./factory/RouteFactory";

export class FactoryService {

    readonly route: RouteFactory;

    constructor(world: Lookup) {
        this.route = new RouteFactory();
    }
}