import { Vector3 } from "babylonjs/Maths/math.vector";

export class Quad {
    readonly p1: Vector3;
    readonly p2: Vector3;
    readonly p3: Vector3;
    readonly p4: Vector3;

    constructor(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}