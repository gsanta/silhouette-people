import { Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { PathItem } from "../../../model/item/PathItem";
import { RotationRestrictor } from "../../../model/item/route/adapters/rotation/RotationRestrictor";
import { LockedSpeed } from "../../../model/item/route/features/LockedSpeed";
import { RouteItem, RouteStoryConfig } from "../../../model/item/route/RouteItem";
import { RouteWalkerImpl } from "../../../model/item/route/RouteWalkerImpl";
import { RouteStore } from "../../../store/RouteStore";
import { IPathFinder } from "../path/path_finder/IPathFinder";
import { MasterPathFinder } from "../path/path_finder/MasterPathFinder";
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
    
    createRandomRoute(character: CharacterItem): RouteItem {
        const quarterMap = character.getQuarter().getMap();
        const pos = character.instance.getPosition2D();
        const maxIndex = quarterMap.len();

        let randomIndex = Math.floor(Math.random() * maxIndex);

        while (quarterMap.getNum(randomIndex) === 1) {
            randomIndex++;
            if (randomIndex >= maxIndex) {
                randomIndex = 0;
            }
        }

        const worldPos = quarterMap.getWorldCoordinate(randomIndex);
        const path = this.pathFinder.findPath(pos, worldPos, quarterMap).map(pos => new Vector3(pos.x, 0, pos.y));

        if (path.length < 2) { return undefined; }
        
        // const route = new RouteItem(new PathItem(path), undefined, character);
        
        // this.routeStore.addRoute(route);
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

    private createRouteWalker(route: RouteItem, config: RouteFactoryConfig): RouteWalkerImpl {
        const routeWalker = new RouteWalkerImpl(route);

        if (config.lockDirection) {
            // routeWalker.addFeature(new DirectionRestrictor(routeWalker, route));
        }

        return routeWalker;
    }
}