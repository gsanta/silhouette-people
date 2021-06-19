import { Vector2 } from "babylonjs";
import { LineEquation } from "../LineEquation";

export class Line {
    readonly p1: Vector2;
    readonly p2: Vector2;
    private _equation: LineEquation;

    constructor(p1: Vector2, p2: Vector2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get equation(): LineEquation {
        if (!this._equation) { this._equation = LineEquation.TwoPoints(this.p1, this.p2); }
        return this._equation;
    }

    get angle(): number {
        const vec = this.p2.subtract(this.p1);
        const deg = Math.atan2(vec.y, vec.x);
        return deg >= 0 ? deg : 2 * Math.PI + deg;
    }
}