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
            this._angle = Rotation.FromVectors(this.p1, this.p2);
        }

        return this._angle;
    }

    getMinDistance(point: Vector2): number {
        const AB = new Vector2(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        const BE = new Vector2(point.x - this.p2.x, point.y - this.p2.y);
        const AE = new Vector2(point.x - this.p1.x, point.y - this.p1.y);

        const AB_BE = Vector2.Dot(AB, BE);
        const AB_AE = Vector2.Dot(AB, AE);

        let minDist = 0;

        if (AB_BE > 0) {
            const y = point.y - this.p2.y;
            const x = point.x - this.p2.x;
            minDist = Math.sqrt(x * x + y * y);
        } else if (AB_AE < 0) {
            const y = point.y - this.p1.y;
            const x = point.x - this.p1.x;
            minDist = Math.sqrt(x * x + y * y);
        } else {
            const x1 = AB.x;
            const y1 = AB.y;
            const x2 = AE.x;
            const y2 = AE.y;
            const mod = Math.sqrt(x1 * x1 + y1 * y1);
            minDist = Math.abs(x1 * y2 - y1 * x2) / mod;
        }
        return minDist;
    }
}