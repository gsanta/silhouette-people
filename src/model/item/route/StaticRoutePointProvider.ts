import { Vector3 } from "babylonjs";
import { GraphVertex } from "../../../service/graph/GraphImpl";
import { RouteItem } from "./RouteItem";
import { RoutePointProvider } from "./RoutepointProvider";


export class StaticRoutePointProvider implements RoutePointProvider {
    routeDirectionChanged(): void {
        throw new Error("Method not implemented.");
    }
    private route: RouteItem;

    setRoute(route: RouteItem) {
        this.route = route;
    }

    getNextRoutePoint(currPoint: GraphVertex) {
        // const routePoints = this.route.getRoutePoints();

        // if (currPoint === routePoints[routePoints.length - 1]) {
        //     return undefined;
        // } else {
        //     return routePoints[routePoints.indexOf(currPoint) + 1];
        // }
    }
}