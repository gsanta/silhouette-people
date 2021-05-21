import { CharacterItem } from "../../../../model/item/character/CharacterItem";
import { toVector2 } from "../../../../model/item/mesh/MeshInstance";
import { RouteStore } from "../../../../store/RouteStore";
import { AbstractPropertyParser } from "../AbstractPropertyParser";

export interface RoutePropertyConfig {
    name: string;
}

export class RoutePropertyParser extends AbstractPropertyParser<RoutePropertyConfig> {
    propName = 'route';

    private readonly routeStore: RouteStore;

    constructor(routeStore: RouteStore, ) {
        super();
        this.routeStore = routeStore;
    }

    processProperty(character: CharacterItem, config: RoutePropertyConfig) {
        const route = this.routeStore.getByName(`pre-defined-route-${config.name}`);
        character.route = route;
        route.character = character;
    }
}