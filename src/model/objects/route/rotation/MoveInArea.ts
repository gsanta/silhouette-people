import { Vector3 } from "babylonjs";
import pointInPolygon from "point-in-polygon";
import { rotToVec } from "../../../../helpers";
import { GraphEdge } from "../../../../service/graph/GraphEdge";
import { LineEquationSideCalc } from "../../../math/LineEquationSideCalc";
import { LineSideCalc } from "../../../math/LineSideCalc";
import { Rotation } from "../../../math/Rotation";
import { Quad } from "../../../math/shapes/Quad";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { MotionFilter } from "../../game_object/MotionController";

export class MoveInArea extends MotionFilter {
    private readonly routeController: RouteController;

    constructor(routeWalker: RouteController) {
        super();
        this.routeController = routeWalker;
    }

    filterDirection(direction: Vector3) {
        const edge = this.routeController.getEdge();
        const character = this.routeController.getCharacter();
        const inPolygon = this.testPointInPolyon(character.position, edge.dimensions);

        if (inPolygon) {
            return direction;
        } else {
            return this.getRestrictedDirection(direction);
        }
    }

    private getRestrictedDirection(origDir: Vector3) {
        const edge = this.routeController.getEdge();
        const route = this.routeController.getRoute();
        const isEdgeReversed = route.isReversed(edge);

        const angle1 = isEdgeReversed ? edge.oppositeAngle : edge.angle;
        const angle2 = this.getAngle2(angle1, edge, isEdgeReversed);
        const characterAngle = Rotation.FromVector3(origDir);

        if (angle1.isBetween(angle2.rad, characterAngle.rad)) {
            return origDir;
        } else {
            const rot = isEdgeReversed ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
            return rotToVec(rot);
        }
    }

    private getAngle2(angle1: Rotation, edge: GraphEdge, isEdgeReversed: boolean) {
        const character = this.routeController.getCharacter();

        const lineSideCalc = new LineSideCalc(edge.line);
        const side = lineSideCalc.determineSide(character.position2D);

        const reversedSign = isEdgeReversed ? 1 : -1;
        const negativeLineSign  = edge.angle.rad > Math.PI ? -1 : 1;
        // const sideSign = side < 0 ? -1 * lineSideCalc.leftSideSign : 1 * lineSideCalc.leftSideSign;

        const deltaAngle = Math.PI / 2 * reversedSign * negativeLineSign * side;

        return angle1.add(deltaAngle).norm();
    }

    private testPointInPolyon(point: Vector3, polygon: Quad): boolean {
        const p = [point.x, point.z];
        const q = polygon.pointArray2d;

        return pointInPolygon(p, q);
    }
}