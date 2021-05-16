import { GraphVertex } from "../../../service/graph/GraphImpl";

export interface RoutePointProvider {
    getNextRoutePoint(currPoint: GraphVertex, prevPoint?: GraphVertex);
    routeDirectionChanged(): void;
}