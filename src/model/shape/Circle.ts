import { Vector2 } from "babylonjs";
import { LineEquation } from "../math/LineEquation";
import { QuadraticLineEquation } from "../math/QuadraticLineEquation";

export class Circle {
    readonly center: Vector2;
    readonly radius: number;

    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    intersection(lineEq: LineEquation): [Vector2, Vector2] {
        lineEq = lineEq.translate(this.center.negate());
        
        let intersections = lineEq.m === undefined ? circleVerticalLineIntersection(this, lineEq) : circleLineIntersection(this, lineEq);

        return <[Vector2, Vector2]> intersections.map(point => point ? point.add(this.center) : undefined);
    }

    tangentFromExternalPoint(externalPoint: Vector2): [LineEquation, LineEquation] {
        // TODO an epslion might be needed
        const dist = externalPoint.subtract(this.center).length();
        const epsilon = 0.1;
        if (dist <= this.radius + epsilon) {
            return [undefined, undefined];
        } else {
            return tangentsFromExternalPoint(externalPoint, this);
        }
    }
}

function circleLineIntersection(circle: Circle, lineEq: LineEquation): [Vector2, Vector2] {
    const quadraticEq = new QuadraticLineEquation(lineEq.m ** 2 + 1, 2 * lineEq.m * lineEq.c, lineEq.c ** 2 - circle.radius ** 2);
    const xVals = quadraticEq.solve();

    return <[Vector2, Vector2]> xVals.map(x => x === undefined ? undefined : new Vector2(x, lineEq.getY(x)));
}

function circleVerticalLineIntersection(circle: Circle, lineEq: LineEquation): [Vector2, Vector2] {
    const discriminant = circle.radius ** 2 - lineEq.xIntercept ** 2;
    if (discriminant < 0) {
        return [undefined, undefined];
    } else {
        const r1 = Math.sqrt(discriminant);
        const r2 = -Math.sqrt(discriminant);
        const yVals = [r1, r2];
        return <[Vector2, Vector2]> yVals.map(y => y === undefined ? undefined : new Vector2(lineEq.getX(y), y));
    }
}

function tangentsFromExternalPoint(externalPoint: Vector2, circle: Circle): [LineEquation, LineEquation] {
    return [
        oneTangentFromExternalPoint(externalPoint, circle, 1),
        oneTangentFromExternalPoint(externalPoint, circle, -1),
    ]
}

function oneTangentFromExternalPoint(externalPoint: Vector2, circle: Circle, sign: number): LineEquation {
    const p = externalPoint.subtract(circle.center);
    const r = circle.radius;

    let slope: number = undefined;
    
    if (r ** 2 - p.x ** 2 !== 0) {
        slope = (p.x * p.y + sign * (r * Math.sqrt(p.x ** 2  + p.y ** 2 - r ** 2))) / (r ** 2 - p.x ** 2);
    }

    if (slope === 0) {
        return new LineEquation(slope, externalPoint.y);
    } else if (slope === undefined) {
        return new LineEquation(undefined, undefined, externalPoint.x);
    } else {
        const yIntercept = externalPoint.y / (slope * externalPoint.x);
        return new LineEquation(slope, yIntercept)
    }
}

