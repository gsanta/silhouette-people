import { GraphEdge } from "../../../../../service/graph/GraphEdge";
import { RouteController } from "../../../../objects/game_object/controller_route/RouteController";

export class ExactDirectionRestrictor {
    private readonly routeWalker: RouteController;

    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
    }

    restrict(edge: GraphEdge): number | null {
        return this.routeWalker.getRoute().isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
    }
}