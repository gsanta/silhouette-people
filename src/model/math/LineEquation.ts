import { Vector2 } from "babylonjs/Maths/math.vector";

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
        if (this.xIntercept !== undefined) {
            return undefined;
        }
        return this.m * x + this.c;
    }

    getX(y: number): number {
        if (this.xIntercept !== undefined) {
            return this.xIntercept;
        } else {
            return (y - this.c) / this.m;
        }
    }

    translate(vec: Vector2) {
        if (this.xIntercept !== undefined) {
            return new LineEquation(undefined, undefined, this.xIntercept + vec.x);
        } else {
            let c = this.c + vec.y;
            c -= this.m * vec.x 
            return new LineEquation(this.m, c, undefined);
        }
    }

    toString() {
        if (this.m === undefined) {
            return `Vertical line with x intercept of ${round(this.xIntercept)}`;
        } else {
            return `y = ${round(this.m)} * x + ${round(this.c)}`;
        }
    }

    isEqualTo(otherLine: LineEquation): boolean {
        if (!otherLine) { return false; }
        if (this.xIntercept !== undefined) {
            return otherLine.xIntercept === this.xIntercept;
        } else {
            return Math.abs(this.m - otherLine.m) < 0.01 && Math.abs(this.c - otherLine.c) < 0.01;
        }
    }
}

function round(val: number) {
    return Math.trunc(val * 100) / 100;
}