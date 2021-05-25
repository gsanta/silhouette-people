import { Matrix, Vector3 } from "babylonjs";

export function rotToVec(rotation: number) {
    const matrix = Matrix.RotationY(rotation);
    return Vector3.TransformCoordinates(new Vector3(0, 0, 1), matrix);
}

export function rotateVec(vector: Vector3, rotation: number) {
    const matrix = Matrix.RotationY(rotation);
    return Vector3.TransformCoordinates(vector, matrix);
}

export function vecToRot(vector: Vector3) {
    const dirAngle = Math.atan2(-vector.z, vector.x);

    return dirAngle + Math.PI / 2;
}