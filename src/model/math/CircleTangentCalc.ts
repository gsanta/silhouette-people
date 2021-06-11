import { Vector2 } from "babylonjs";
import { Circle } from "../shape/Circle";
import { LineEquation } from "./LineEquation";

export class CircleTangentCalc {
    private readonly circle: Circle;

    constructor(circle: Circle) {
        this.circle = circle;
    }

    getTangentLines(p: Vector2): [LineEquation, LineEquation] {
        if (this.isExternalPoint(p)) {
            return [this.getSingleTangentLine(p, 1), this.getSingleTangentLine(p, -1)];
        } else {
            return undefined;
        }
    }

    private isExternalPoint(p: Vector2) {
        const dist = p.subtract(this.circle.center).length();
        const epsilon = 0.1;

        return dist > this.circle.radius + epsilon
    }

    private getSingleTangentLine(p: Vector2, sign: number): LineEquation {
        p = p.subtract(this.circle.center);
        const x = p.x;
        const y = p.y;
        const r = this.circle.radius;
    
        let m: number = Infinity;
        
        const a = r ** 2 - x ** 2;
        const b = 2 * x * y;
        const c = r ** 2 - y ** 2;
        if (a !== 0) {
            m = (- b + sign * Math.sqrt( b ** 2 - 4 * a * c)) / (2 * a);
        }
    
        let equation: LineEquation;
    
        if (m === 0) {
            equation = new LineEquation(m, p.y);
        } else if (isFinite(m) === false) {
            equation = LineEquation.Vertical(p.x);
        } else {
            const yIntercept = y - m * x;
            equation = new LineEquation(m, yIntercept);
        }
    
        return equation.translate(this.circle.center);
    }
}