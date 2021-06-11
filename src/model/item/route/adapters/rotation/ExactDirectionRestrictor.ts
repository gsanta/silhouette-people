import { GraphEdge } from "../../../../../service/graph/GraphEdge";
import { RouteWalker } from "../../RouteWalker";

export class ExactDirectionRestrictor {
    private readonly routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    restrict(edge: GraphEdge): number | null {
        return this.routeWalker.getRoute().isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
    }
}