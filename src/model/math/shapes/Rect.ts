import { Vector2 } from "babylonjs";

export class Rect {
    min: Vector2;
    max: Vector2;

    constructor(min: Vector2, max: Vector2) {
        this.min = min;
        this.max = max;
    }

    getWidth() {
        return this.max.x - this.min.x;
    }

    getHeight() {
        return this.max.y - this.min.y;
    }

    center(): Vector2 {
        return  new Vector2((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2);
    }

    containsPoint(point: Vector2): boolean {
        return point.x > this.min.x && point.x < this.max.x && point.y > this.min.y && point.y < this.max.y;
    }
}