

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
            console.log('disc: ' + (this.b ** 2 - 4 * this.a * this.c));
            const discriminant =  this.b ** 2 - 4 * this.a * this.c;
            if (discriminant < 0) {
                return [undefined, undefined];
            } else if (discriminant === 0) {
                const r = - this.b / (2 * this.a);
                return [r, undefined];
            } else {
                const r1 = (- this.b + Math.sqrt(discriminant)) / (2 * this.a);
                const r2 = (- this.b - Math.sqrt(discriminant)) / (2 * this.a);
                return [r1, r2];
            }
        }
    }
}