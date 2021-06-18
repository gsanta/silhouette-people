import { Vector2 } from "babylonjs";
import { QuarterMap } from "../../../../model/objects/game_object/types/quarter/QuarterMap";

export interface IPathFinder {
    findPath(from: Vector2, to: Vector2, areaMap: QuarterMap): Vector2[];
}