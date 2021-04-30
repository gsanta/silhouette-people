import { Vector2 } from "babylonjs";
import { QuarterMap } from "../../../model/quarter/QuarterMap";
import { IPathFinder } from "./IPathFinder";


export class PathWorldPosConversionDecorator implements IPathFinder {
    private pathFinder: IPathFinder;

    constructor(pathFinder: IPathFinder) {
        this.pathFinder = pathFinder;
    }

    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[] {
        const path = this.pathFinder.findPath(from, to, areaMap);
        const worldPoints = path.map(grid => areaMap.getWorldCoordinate(areaMap.getIndexAtGridCoordinate(grid.x, grid.y)));
        return worldPoints;
    }
}