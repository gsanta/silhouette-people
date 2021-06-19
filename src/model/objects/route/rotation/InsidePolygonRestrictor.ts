import { Vector3 } from "babylonjs";
import pointInPolygon from "point-in-polygon";
import { rotToVec, vector3ToRotation } from "../../../../helpers";
import { LineSideCalc } from "../../../math/LineSideCalc";
import { Rotation } from "../../../math/Rotation";
import { Quad } from "../../../math/shapes/Quad";
import { RouteController } from "../../game_object/controller_route/RouteController";
import { MotionFilter } from "../../game_object/MotionController";

export class InsidePolygonRestrictor extends MotionFilter {
    private readonly routeWalker: RouteController;

    constructor(routeWalker: RouteController) {
        super();
        this.routeWalker = routeWalker;
    }

    filterDirection(direction: Vector3) {
        const edge = this.routeWalker.getEdge();
        const character = this.routeWalker.getCharacter();
        const route = this.routeWalker.getRoute();
        const inPolygon = this.testPointInPolyon(character.position, edge.dimensions);

        if (inPolygon) {
            return direction;
        } else {
            const side = new LineSideCalc(edge.line.equation).getSide(character.position2D);
            const rotation = edge.angle;

            if (side > 0) {
                const angle2 = edge.angle.add(Math.PI);
                const characterRotation = new Rotation(vector3ToRotation(direction)).standardAngle().norm();
                if (rotation.isBetween(angle2.rad, characterRotation)) {
                    return direction;
                } else {
                    const rot = route.isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
                    return rotToVec(rot);
                }
            } else {
                const angle2 = edge.angle.add(-Math.PI);
                const characterRotation = vector3ToRotation(direction);
                if (rotation.isBetween(angle2.rad, characterRotation)) {
                    return direction;
                } else {
                    const rot = route.isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
                    return rotToVec(rot);
                }
            }
        }
    }

    private testPointInPolyon(point: Vector3, polygon: Quad): boolean {
        const p = [point.x, point.z];
        const q = polygon.pointArray2d;

        return pointInPolygon(p, q);
    }
}