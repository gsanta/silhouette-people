import { Vector2 } from "babylonjs";

export class Line {
    readonly p1: Vector2;
    readonly p2: Vector2;

    constructor(p1: Vector2, p2: Vector2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get angle(): number {
        const vec = this.p2.subtract(this.p1);
        const deg = Math.atan2(vec.y, vec.x);
        return deg >= 0 ? deg : 2 * Math.PI + deg;
    }
}