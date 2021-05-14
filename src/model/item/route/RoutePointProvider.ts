import { Vector3 } from "babylonjs/Maths/math.vector";
import { RouteItem } from "./RouteItem";

export interface RoutePointProvider {
    getNextRoutePoint(currPoint: Vector3, prevPoint: Vector3);
}