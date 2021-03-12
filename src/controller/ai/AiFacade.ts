import { AreaMap } from "./AreaMap";
import { PathFinder } from "./PathFinder";

export class AiFacade {
    pathFinder: PathFinder;
    areaMap: AreaMap;

    constructor() {
        this.pathFinder = new PathFinder(this);
    }
}