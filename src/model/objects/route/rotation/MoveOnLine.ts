import { Vector3 } from "babylonjs";
import { rotToVec } from "../../../../helpers";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { MotionFilter } from "../../game_object/MotionController";

export class MoveOnLine extends MotionFilter {
    private readonly routeWalker: RouteController;

    constructor(routeWalker: RouteController) {
        super();
        this.routeWalker = routeWalker;
    }

    filterDirection(_direction: Vector3) {
        const edge = this.routeWalker.getEdge();
        const route = this.routeWalker.getRoute();
        const rotation = route.isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
        return rotToVec(rotation);
    }
}