import { GraphEdge } from "../../../../../service/graph/GraphImpl";
import { RouteWalker } from "../../RouteWalker";

export class ExactDirectionRestrictor {
    private readonly routeWalker: RouteWalker;

    constructor(routeWalker: RouteWalker) {
        this.routeWalker = routeWalker;
    }

    restrict(edge: GraphEdge): number | null {
        return this.routeWalker.isReversed() ? edge.oppositeDirection : edge.direction;
    }
}