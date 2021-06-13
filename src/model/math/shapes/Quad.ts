import { Vector3 } from "babylonjs/Maths/math.vector";

export class Quad {
    readonly p1: Vector3;
    readonly p2: Vector3;
    readonly p3: Vector3;
    readonly p4: Vector3;
    readonly pointArray2d: number[][];

    constructor(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.pointArray2d = [
            [this.p1.x, this.p1.z],
            [this.p2.x, this.p2.z],
            [this.p3.x, this.p3.z],
            [this.p4.x, this.p4.z],
        ]
    }
}