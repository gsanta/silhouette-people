import { Vector3 } from "babylonjs";
import pointInPolygon from "point-in-polygon";
import { GraphEdge } from "../../../../../service/graph/GraphEdge";
import { Quad } from "../../../../shape/Quad";
import { RouteController } from "../../RouteController";

export class InsidePolygonRestrictor {
    private readonly routeWalker: RouteController;

    constructor(routeWalker: RouteController) {
        this.routeWalker = routeWalker;
    }

    restrict(edge: GraphEdge): number | null {
        const character = this.routeWalker.getCharacter();
        const route = this.routeWalker.getRoute();
        const inPolygon = this.testPointInPolyon(character.position, edge.dimensions);

        if (!inPolygon) {
            return route.isReversed(edge) ? edge.oppositeAngle.worldAngle().rad : edge.angle.worldAngle().rad;
        }

        return null;
    }

    private testPointInPolyon(point: Vector3, polygon: Quad): boolean {
        const p = [point.x, point.z];
        const q = polygon.pointArray2d;

        return pointInPolygon(p, q);
    }
}