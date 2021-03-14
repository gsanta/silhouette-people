import { AreaMap } from "../../model/area/AreaMap";
import { IPathFinder } from "./IPathFinder";
import { MasterPathFinder } from "./MasterPathFinder";

export class AreaService {
    pathFinder: IPathFinder;
    areaMap: AreaMap;

    constructor() {
        this.pathFinder = new MasterPathFinder();
    }
}