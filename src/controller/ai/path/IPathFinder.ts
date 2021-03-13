import { Vector2 } from "babylonjs";
import { AreaMap } from "../AreaMap";

export interface IPathFinder {
    findPath(from: Vector2, to: Vector2, areaMap: AreaMap): Vector2[];
}