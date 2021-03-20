import { Route } from "../../model/district/Route";
import { GameObj } from "../../model/objs/GameObj";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { IPathFinder } from "../district/path_finding/IPathFinder";
import { MasterPathFinder } from "../district/path_finding/MasterPathFinder";

export class RouteFactory {
    private pathFinder: IPathFinder;

    constructor() {
        this.pathFinder = new MasterPathFinder();
    }
    
    createRandomRoute(gameObject: GameObj): Route {
        const quarterMap = gameObject.location.getQuarter().getMap();
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
        
        return new Route(gameObject, path);
    }
}