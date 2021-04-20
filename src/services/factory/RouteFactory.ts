import { Vector2 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../../di/diDecorators";
import { CharacterObj } from "../../model/general/objs/CharacterObj";
import { RealTimeRouteWalker } from "../../model/general/objs/RealTimeRouteWalker";
import { RouteObj } from "../../model/general/objs/RouteObj";
import { RouteStore } from "../../stores/RouteStore";
import { IPathFinder } from "../district/path/IPathFinder";
import { MasterPathFinder } from "../district/path/MasterPathFinder";
import { lookup } from "../Lookup";

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
        const pos = character.getPosition2D();
        const maxIndex = quarterMap.len();

        let randomIndex = Math.floor(Math.random() * maxIndex);

        while (quarterMap.getNum(randomIndex) === 1) {
            randomIndex++;
            if (randomIndex >= maxIndex) {
                randomIndex = 0;
            }
        }

        const worldPos = quarterMap.getWorldCoordinate(randomIndex);
        const path = this.pathFinder.findPath(pos, worldPos, quarterMap);

        if (path.length < 2) { return undefined; }
        
        const route = new RouteObj(character, path);
        route.walker = new RealTimeRouteWalker(route);
        
        this.routeStore.addRoute(route);
    }

    createRoute(character: CharacterObj, checkPoints: Vector2[]): RouteObj {
        const route = new RouteObj(character, checkPoints);
        route.walker = new RealTimeRouteWalker(route);

        this.routeStore.addRoute(route);
        return route;
    }
}