import { AreaMap } from "./AreaMap";
import { IPathFinder } from "./path/IPathFinder";
import { MasterPathFinder } from "./path/MasterPathFinder";

export class AiFacade {
    pathFinder: IPathFinder;
    areaMap: AreaMap;

    constructor() {
        this.pathFinder = new MasterPathFinder();
    }
}