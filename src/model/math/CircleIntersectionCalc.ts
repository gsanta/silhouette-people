import { Vector2 } from "babylonjs";
import { Circle } from "../shape/Circle";
import { LineEquation } from "./LineEquation";
import { QuadraticLineEquation } from "./QuadraticLineEquation";

export class CircleIntersectionCalc {
    private readonly circle: Circle;

    constructor(circle: Circle) {
        this.circle = circle;
    }

    getIntersectionPoints(lineEq: LineEquation): [Vector2, Vector2] {
        lineEq = lineEq.translate(this.circle.center.negate());
        
        let intersections = lineEq.m === undefined ? this.verticalLineIntersection(lineEq) : this.lineIntersection(lineEq);

        return <[Vector2, Vector2]> intersections.map(point => point ? point.add(this.circle.center) : undefined);
    }

    private lineIntersection(lineEq: LineEquation): [Vector2, Vector2] {
        const quadraticEq = new QuadraticLineEquation(lineEq.m ** 2 + 1, 2 * lineEq.m * lineEq.c, lineEq.c ** 2 - this.circle.radius ** 2);
        const xVals = quadraticEq.solve();
    
        return <[Vector2, Vector2]> xVals.map(x => x === undefined ? undefined : new Vector2(x, lineEq.getY(x)));
    }

    private verticalLineIntersection(lineEq: LineEquation): [Vector2, Vector2] {
        const discriminant = this.circle.radius ** 2 - lineEq.xIntercept ** 2;
        if (discriminant < 0) {
            return [undefined, undefined];
        } else {
            const r1 = Math.sqrt(discriminant);
            const r2 = -Math.sqrt(discriminant);
            const yVals = [r1, r2];
            return <[Vector2, Vector2]> yVals.map(y => y === undefined ? undefined : new Vector2(lineEq.getX(y), y));
        }
    }
}