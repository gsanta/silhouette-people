

export class LineEquation {
    readonly slope: number;
    readonly yIntercept: number;
    readonly xIntercept: number;

    constructor(slope: number, yIntercept: number, xIntercept?: number) {
        this.slope = slope;
        this.yIntercept = yIntercept;
        this.xIntercept = xIntercept;
    }

    toString() {
        if (this.slope === undefined) {
            return `Vertical line with x intercept of ${round(this.xIntercept)}`;
        } else {
            return `y = ${round(this.slope)} * x + ${round(this.yIntercept)}`;
        }
    }
}

function round(val: number) {
    return Math.trunc(val * 100) / 100;
}