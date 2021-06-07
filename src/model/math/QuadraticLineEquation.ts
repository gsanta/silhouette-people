import { EPSILON } from "../../helpers";


export class QuadraticLineEquation {
    readonly a: number;
    readonly b: number;
    readonly c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    solve(): [number, number] {

        if (2 * this.a === 0) {
            return undefined;
        } else {
            let discriminant =  this.b ** 2 - 4 * this.a * this.c;
            if (Math.abs(discriminant) < EPSILON) {
                discriminant = 0;
            }

            if (discriminant < 0) {
                return [undefined, undefined];
            } else if (this.isZero(discriminant)) {
                const r = - this.b / (2 * this.a);
                return [r, undefined];
            } else {
                const r1 = (- this.b + Math.sqrt(discriminant)) / (2 * this.a);
                const r2 = (- this.b - Math.sqrt(discriminant)) / (2 * this.a);
                return [r1, r2];
            }
        }
    }

    private isZero(num: number) {
        return Math.abs(num) < 0.1;
    }
}