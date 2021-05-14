import { Vector3 } from "babylonjs/Maths/math.vector";
import { RouteItem } from "./RouteItem";

export interface RoutePointProvider {
    setRoute(route: RouteItem);
    getNextRoutePoint(currPoint: Vector3);
}