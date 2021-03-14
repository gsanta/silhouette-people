import { Vector2 } from "babylonjs";
import { AreaMap } from "../../model/area/AreaMap";
import { IPathFinder } from "./IPathFinder";


export class PathWorldPosConversionDecorator implements IPathFinder {
    private pathFinder: IPathFinder;

    constructor(pathFinder: IPathFinder) {
        this.pathFinder = pathFinder;
    }

    findPath(from: Vector2, to: Vector2, areaMap: AreaMap): Vector2[] {
        const path = this.pathFinder.findPath(from, to, areaMap);
        const worldPoints = path.map(grid => areaMap.getWorldCoordinate(areaMap.getIndexAtGridCoordinate(grid.x, grid.y)));
        return worldPoints;
    }
}