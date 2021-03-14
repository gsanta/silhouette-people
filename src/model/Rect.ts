import { Vector2 } from "babylonjs/Maths/math.vector";


export class Rect {
    topLeft: Vector2;
    botRight: Vector2;

    constructor(topLeft: Vector2, botRight: Vector2) {
        this.topLeft = topLeft;
        this.botRight = botRight;
    }

    getWidth() {
        return this.botRight.x - this.topLeft.x;
    }

    getHeight() {
        return Math.abs(this.botRight.y - this.topLeft.y);
    }
}