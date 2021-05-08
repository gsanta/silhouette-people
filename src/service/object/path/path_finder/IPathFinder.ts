import { Vector2 } from "babylonjs";
import { QuarterMap } from "../../../../model/item/quarter/QuarterMap";

export interface IPathFinder {
    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[];
}