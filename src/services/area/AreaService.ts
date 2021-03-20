import { QuarterMap } from "../../model/area/QuarterMap";
import { IPathFinder } from "./IPathFinder";
import { MasterPathFinder } from "./MasterPathFinder";

export class AreaService {
    pathFinder: IPathFinder;
    areaMap: QuarterMap;

    constructor() {
        this.pathFinder = new MasterPathFinder();
    }
}