import { Vector2 } from "babylonjs";
import { LineEquation } from "../LineEquation";
import { Rotation } from "../Rotation";

export class Line {
    readonly p1: Vector2;
    readonly p2: Vector2;
    private _equation: LineEquation;
    private _angle: Rotation;

    constructor(p1: Vector2, p2: Vector2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get equation(): LineEquation {
        if (!this._equation) { this._equation = LineEquation.TwoPoints(this.p1, this.p2); }
        return this._equation;
    }

    get angle(): Rotation {
        if (this._angle === undefined) {
            this._angle = Rotation.FromVectors(this.p1, this.p2).worldAngle();
        }

        return this._angle;
    }
}