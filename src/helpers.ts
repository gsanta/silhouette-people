import { Matrix, Vector2, Vector3 } from "babylonjs";

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

export function vector3ToRotation(vector: Vector3) {
    const dirAngle = Math.atan2(-vector.z, vector.x);

    return dirAngle + Math.PI / 2;
}

export function vector2ToRotation(vector: Vector2) {
    let dirAngle = Math.atan2(vector.y, vector.x);
    const forwardDirAdjustMent = -Math.PI / 2;
    dirAngle = dirAngle + forwardDirAdjustMent;
    return dirAngle >= 0 ? dirAngle : 2 * Math.PI + dirAngle;
}

export function toVector2(vec3: Vector3) {
    return new Vector2(vec3.x, vec3.z);
}

export function toVector3(vec2: Vector2, y: number = 0) {
    return new Vector3(vec2.x, y, vec2.y);
}

export function numToVector3(num: number): Vector3 {
    return new Vector3(num, num, num);
}