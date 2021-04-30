import { Vector2 } from "babylonjs";
import { QuarterMap } from "../../../model/quarter/QuarterMap";
import { IPathFinder } from "./IPathFinder";
import { PathFinder } from "./PathFinder";
import { PathRedundancyEliminationDecorator } from "./PathRedundancyEliminationDecorator";
import { PathWorldPosConversionDecorator } from "./PathWorldPosConversionDecorator";


export class MasterPathFinder implements IPathFinder {
    private pathFinder: IPathFinder;

    constructor() {
        this.pathFinder = new PathWorldPosConversionDecorator(new PathRedundancyEliminationDecorator(new PathFinder()));
    }
    
    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[] {
        return this.pathFinder.findPath(from, to, areaMap);
    }
}