import { Vector2 } from "babylonjs";
import { CircleIntersectionCalc } from "../CircleIntersectionCalc";
import { CircleTangentCalc } from "../CircleTangentCalc";
import { LineEquation } from "../LineEquation";

export class Circle {
    readonly center: Vector2;
    readonly radius: number;

    private readonly tangentCalc: CircleTangentCalc;
    private readonly intersectionCalc: CircleIntersectionCalc;

    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;

        this.tangentCalc = new CircleTangentCalc(this);
        this.intersectionCalc = new CircleIntersectionCalc(this);
    }

    intersection(lineEq: LineEquation): [Vector2, Vector2] {
        return this.intersectionCalc.getIntersectionPoints(lineEq);
    }

    tangentFromExternalPoint(externalPoint: Vector2): [LineEquation, LineEquation] {
        return this.tangentCalc.getTangentLines(externalPoint);
    }

    toString() {
        return `center: ${this.center.toString()} radius: ${this.radius}`;
    }
}