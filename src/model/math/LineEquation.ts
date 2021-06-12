import { Vector2 } from "babylonjs/Maths/math.vector";
import { Rotation } from "./Rotation";

export class LineEquation {
    readonly m: number;
    readonly c: number;
    readonly xIntercept: number;

    constructor(m: number, c: number, xIntercept?: number) {
        this.m = m;
        this.c = c;
        this.xIntercept = xIntercept;
    }

    getY(x: number) {
        if (this.isVertical()) {
            return undefined;
        }
        return this.m * x + this.c;
    }

    getX(y: number): number {
        if (this.isVertical()) {
            return this.xIntercept;
        } else {
            return (y - this.c) / this.m;
        }
    }

    get angle(): number {
        return Math.atan(this.m);
    }

    getPerpendicularLine(point: Vector2): LineEquation {
        const angle = new Rotation(this.angle).add(Math.PI / 2).norm();
        let m = isVerticalAngle(angle) ? Infinity : Math.tan(angle);
        return LineEquation.PointSlope(point, m);
    }

    translate(vec: Vector2) {
        if (this.isVertical()) {
            return LineEquation.Vertical(this.xIntercept + vec.x);
        } else {
            let c = this.c + vec.y;
            c -= this.m * vec.x 
            return new LineEquation(this.m, c, undefined);
        }
    }

    toString() {
        if (this.isVertical()) {
            return `Vertical line with x intercept of ${round(this.xIntercept)}`;
        } else {
            return `y = ${round(this.m)} * x + ${round(this.c)}`;
        }
    }

    isVertical(): boolean {
        return isFinite(this.m) === false;
    }

    isHorizontal(): boolean {
        const epsilon = 0.01;
        return Math.abs(this.m) <= epsilon;
    }

    isEqualTo(otherLine: LineEquation): boolean {
        if (!otherLine) { return false; }
        if (this.xIntercept !== undefined) {
            return otherLine.xIntercept === this.xIntercept;
        } else {
            return Math.abs(this.m - otherLine.m) < 0.01 && Math.abs(this.c - otherLine.c) < 0.01;
        }
    }

    static Vertical(xIntercept: number): LineEquation {
        return new LineEquation(Infinity, undefined, xIntercept);
    }

    static PointSlope(point: Vector2, m: number): LineEquation {
        if (isFinite(m)) {
            const c = - m * point.x + point.y;
            return new LineEquation(m, c);
        } else {
            return LineEquation.Vertical(point.x);
        }
    }
}

function isVerticalAngle(angle: number) {
    const epsilon = 0.01;
    return Math.abs(Math.PI / 2 - Math.abs(angle)) <= epsilon;
}

function round(val: number) {
    return Math.trunc(val * 100) / 100;
}