import { InjectProperty } from "../../../di/diDecorators";
import { PathItem } from "../../../model/objects/PathItem";
import { RouteItem, RouteStoryConfig } from "../../../model/objects/route/RouteItem";
import { RouteControllerImpl } from "../../../model/objects/game_object/controller_route/RouteControllerImpl";
import { RouteStore } from "../../../store/RouteStore";
import { IPathFinder } from "../../object/path/path_finder/IPathFinder";
import { MasterPathFinder } from "../../object/path/path_finder/MasterPathFinder";
import { lookup } from "../../Lookup";
import { GameObject } from "../../../model/objects/game_object/GameObject";

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

    createRoute(path: PathItem, config: RouteFactoryConfig, character?: GameObject): RouteItem {
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