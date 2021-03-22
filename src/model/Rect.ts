import { Vector2 } from "babylonjs/Maths/math.vector";


export class Rect {
    tl: Vector2;
    br: Vector2;

    constructor(topLeft: Vector2, botRight: Vector2) {
        this.tl = topLeft;
        this.br = botRight;
    }

    getWidth() {
        return this.br.x - this.tl.x;
    }

    getHeight() {
        return Math.abs(this.br.y - this.tl.y);
    }
}