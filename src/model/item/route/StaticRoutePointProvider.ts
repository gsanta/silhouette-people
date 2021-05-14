import { Vector3 } from "babylonjs";
import { RouteItem } from "./RouteItem";
import { RoutePointProvider } from "./RoutepointProvider";


export class StaticRoutePointProvider implements RoutePointProvider {
    private route: RouteItem;

    setRoute(route: RouteItem) {
        this.route = route;
    }

    getNextRoutePoint(currPoint: Vector3) {
        const routePoints = this.route.getRoutePoints();

        if (currPoint === routePoints[routePoints.length - 1]) {
            return undefined;
        } else {
            return routePoints[routePoints.indexOf(currPoint) + 1];
        }
    }
}