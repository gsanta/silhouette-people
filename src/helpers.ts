import { Matrix, Vector2, Vector3 } from "babylonjs";
import { LineEquation } from "./model/math/LineEquation";
import { Circle } from "./model/shape/Circle";

export function rotToVec(rotation: number) {
    const matrix = Matrix.RotationY(rotation);
    return Vector3.TransformCoordinates(new Vector3(0, 0, 1), matrix);
}

export function areSamePoints(vec1: Vector2, vec2: Vector2) {
    return vec1.subtract(vec2).length() <= 0.1;
}

export function rotateVec(vector: Vector3, rotation: number) {
    const matrix = Matrix.RotationY(rotation);
    return Vector3.TransformCoordinates(vector, matrix);
}

export function vecToRot(vector: Vector3) {
    const dirAngle = Math.atan2(-vector.z, vector.x);

    return dirAngle + Math.PI / 2;
}

export function toVector2(vec3: Vector3) {
    return new Vector2(vec3.x, vec3.z);
}

export function intersectionCicleAndLine(circle: Circle, lineEquation: LineEquation) {
    `x ** 2 + y ** 2 = r ** 2 => x ** 2 + (slope * x + c) ** 2 = r ** 2`;
    `(1 + slope ** 2) * x ** 2 + 2 * slope * x + (c ** 2 - r ** 2) = 0`
}

const p = new Vector3(-5, 0, 0);
const circleCenter = new Vector3(0, 0, 0);
const radius = 5;


export function solveTangent(point: Vector3, circleCenter: Vector3, radius: number) {
    const p = point.subtract(circleCenter);

    // const m1 = - (p.x * p.z + radius * Math.sqrt(p.x ** 2 + p.z ** 2 - radius ** 2)) / (radius ** 2 - p.x  ** 2);
    // const m2 = - (p.x * p.z - radius * Math.sqrt(p.x ** 2 + p.z ** 2 - radius ** 2)) / (radius ** 2 - p.x  ** 2);

    const m1 = (- p.x * p.z + (radius * Math.sqrt(p.x ** 2  + p.z ** 2 - radius ** 2))) / (radius ** 2 - p.x ** 2);

    const c1 = m1 === 0 ? p.z : p.z / (m1 * p.x);

    const x1 = 2 * m1 * c1 / (2 * (m1 ** 2 + 1))
    const y1 = m1 * p.x + c1;

    return new Vector3(x1, 0, y1).add(circleCenter);
}