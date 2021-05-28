import { Vector2 } from "babylonjs";
import { LineEquation } from "../math/LineEquation";

export class Circle {
    readonly center: Vector2;
    readonly radius: number;

    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    tangentFromExternalPoint(externalPoint: Vector2): [LineEquation, LineEquation] {
        return tangentsFromExternalPoint(externalPoint, this);
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
        console.log(slope)
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

