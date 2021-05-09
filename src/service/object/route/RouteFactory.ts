import { Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { CharacterItem } from "../../../model/item/character/CharacterItem";
import { PathItem } from "../../../model/item/PathItem";
import { LockedDirection } from "../../../model/item/route/features/LockedDirection";
import { LockedSpeed } from "../../../model/item/route/features/LockedSpeed";
import { RouteItem } from "../../../model/item/route/RouteItem";
import { RouteWalker } from "../../../model/item/route/RouteWalker";
import { RouteStore } from "../../../store/RouteStore";
import { IPathFinder } from "../path/path_finder/IPathFinder";
import { MasterPathFinder } from "../path/path_finder/MasterPathFinder";
import { lookup } from "../../Lookup";

export interface RouteConfig {
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
        
        const route = new RouteItem([new PathItem(path)], undefined, character);
        // route.walker = new RealTimeRouteWalker(route);
        
        this.routeStore.addRoute(route);
    }

    createRoute(pathes: PathItem[], config: RouteConfig, character?: CharacterItem): RouteItem {
        const route = new RouteItem(pathes, config.name, character);
        route.walker = this.createRouteWalker(route, config);

        this.routeStore.addRoute(route);
        return route;
    }

    private createRouteWalker(route: RouteItem, config: RouteConfig): RouteWalker {
        const routeWalker = new RouteWalker(route);

        if (config.lockSpeed) {
            routeWalker.addFeature(new LockedSpeed(routeWalker, route.character));
        }

        if (config.lockDirection) {
            routeWalker.addFeature(new LockedDirection(routeWalker, route.character));
        }

        return routeWalker;
    }
}