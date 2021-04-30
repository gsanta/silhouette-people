import { Vector3 } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { CharacterObj } from "../../model/general/objs/CharacterObj";
import { CharacterRouteWalker } from "../../model/general/objs/CharacterRouteWalker";
import { Path } from "../../model/general/objs/Path";
import { LockedDirection } from "../../model/general/objs/route/LockedDirection";
import { LockedFeature } from "../../model/general/objs/route/LockedFeature";
import { LockedSpeed } from "../../model/general/objs/route/LockedSpeed";
import { RouteObj } from "../../model/general/objs/RouteObj";
import { RouteWalker } from "../../model/general/objs/RouteWalker";
import { RouteStore } from "../../stores/RouteStore";
import { IPathFinder } from "../district/path/IPathFinder";
import { MasterPathFinder } from "../district/path/MasterPathFinder";
import { lookup } from "../Lookup";

export interface RouteConfig {
    lockSpeed?: boolean;
    lockDirection?: boolean;
}

export class RouteFactory {
    
    @InjectProperty("RouteStore")
    private routeStore: RouteStore;
    
    private pathFinder: IPathFinder;

    constructor() {
        this.routeStore = lookup.routeStore;
        this.pathFinder = new MasterPathFinder();
    }
    
    createRandomRoute(character: CharacterObj): RouteObj {
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
        
        const route = new RouteObj(character, [new Path(path)]);
        // route.walker = new RealTimeRouteWalker(route);
        
        this.routeStore.addRoute(route);
    }

    createRoute(character: CharacterObj, pathes: Path[], config: RouteConfig): RouteObj {
        const route = new RouteObj(character, pathes);
        route.walker = this.createRouteWalker(route, config);

        this.routeStore.addRoute(route);
        return route;
    }

    private createRouteWalker(route: RouteObj, config: RouteConfig): RouteWalker {
        const routeWalker = new CharacterRouteWalker(route);

        if (config.lockSpeed) {
            routeWalker.addFeature(new LockedSpeed(routeWalker, route.character));
        }

        if (config.lockDirection) {
            routeWalker.addFeature(new LockedDirection(routeWalker, route.character));
        }

        return routeWalker;
    }
}