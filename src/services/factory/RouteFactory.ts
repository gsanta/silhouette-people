import { Route } from "../../model/general/objs/Route";
import { MeshObj } from "../../model/general/objs/MeshObj";
import { QuarterObj } from "../../model/general/objs/QuarterObj";
import { IPathFinder } from "../district/path/IPathFinder";
import { MasterPathFinder } from "../district/path/MasterPathFinder";
import { RealTimeRouteWalker } from "../../model/general/objs/RealTimeRouteWalker";

export class RouteFactory {
    private pathFinder: IPathFinder;

    constructor() {
        this.pathFinder = new MasterPathFinder();
    }
    
    createRandomRoute(gameObject: MeshObj): Route {
        const quarterMap = gameObject.getQuarter().getMap();
        const pos = gameObject.getPosition2D();
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
        
        const route = new Route(gameObject, path);
        route.walker = new RealTimeRouteWalker(route);
    }
}