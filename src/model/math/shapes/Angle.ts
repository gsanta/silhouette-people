import { Vector2 } from "babylonjs";

export class Angle {
    readonly anchor: Vector2;
    readonly angle: number;

    constructor(anchor: Vector2, angle: number) {
        this.anchor = anchor;
        this.angle = angle;
    }

    getPointWithDistance(dist: number) {
        const x = dist * Math.cos(this.angle);
        const y = dist * Math.sin(this.angle);
        return this.anchor.add(new Vector2(x, y));
    }
}