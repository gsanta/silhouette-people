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
        let m = this.isHorizontal() ? Infinity : (- 1 / this.m);
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

    static TwoPoints(vec1: Vector2, vec2: Vector2) {
        if (Point.isVertical(vec1, vec2)) {
            return LineEquation.Vertical(vec1.x);
        } else {
            const m = (vec2.y - vec1.y) / (vec2.x - vec1.x);
            const c = vec1.y - (vec1.x * m);

            return new LineEquation(m, c);
        }
    }
}

namespace Point {
    const epsilon = 0.1;

    export function isVertical(vec1: Vector2, vec2: Vector2): boolean {
        return Math.abs(vec1.x - vec2.x) <= epsilon;
    }

    export function isZero(num: number): boolean {
        return Math.abs(num) <= epsilon;
    }
}

function isVerticalAngle(angle: number) {
    const epsilon = 0.01;
    return Math.abs(Math.PI / 2 - Math.abs(angle)) <= epsilon;
}

function round(val: number) {
    return Math.trunc(val * 100) / 100;
}