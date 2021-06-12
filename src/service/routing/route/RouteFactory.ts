import { InjectProperty } from "../../../di/diDecorators";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { PathItem } from "../../../model/item/PathItem";
import { RouteItem, RouteStoryConfig } from "../../../model/item/route/RouteItem";
import { RouteControllerImpl } from "../../../model/item/route/RouteControllerImpl";
import { RouteStore } from "../../../store/RouteStore";
import { IPathFinder } from "../../object/path/path_finder/IPathFinder";
import { MasterPathFinder } from "../../object/path/path_finder/MasterPathFinder";
import { lookup } from "../../Lookup";

export interface RouteFactoryConfig {
    lockSpeed?: boolean;
    lockDirection?: boolean;
    name?: string;
}

export class RouteFactory {
    
    @InjectProperty("RouteStore")
    private routeStore: RouteStore;
    
    private pathFinder: IPathFinder;

    constructor() {
        this.routeStore = lookup.routeStore;
        this.pathFinder = new MasterPathFinder();
    }

    createFromConfig(routeConfig: RouteStoryConfig) {
        
    }

    createRoute(path: PathItem, config: RouteFactoryConfig, character?: CharacterItem): RouteItem {
        // const route = new RouteItem(path, config.name, character);
        // route.walker = this.createRouteWalker(route, config);

        // this.routeStore.addRoute(route);
        // return route;
        return undefined;
    }

    private createRouteWalker(route: RouteItem, config: RouteFactoryConfig): RouteControllerImpl {
        const routeWalker = new RouteControllerImpl(route, null);

        if (config.lockDirection) {
            // routeWalker.addFeature(new DirectionRestrictor(routeWalker, route));
        }

        return routeWalker;
    }
}