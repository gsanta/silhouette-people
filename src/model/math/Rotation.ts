import { Matrix, Vector2, Vector3 } from "babylonjs";
import { vector2ToRotation } from "../../helpers";

export class DIRECTION {
    static N() {
        return new Vector2(0, 1);
    }

    static S() {
        return new Vector2(0, -1);
    }

    static W() {
        return new Vector2(-1, 0);
    }

    static E() {
        return new Vector2(1, 0);
    }

    static NW() {
        return new Vector2(-1, 1);
    }

    static NE() {
        return new Vector2(1, 1);
    }
}

export class Rotation {
    readonly rad: number;

    constructor(rad: number) {
        this.rad = rad;
    }

    norm() {
        return this.rad >= 0 ? this.rad : 2 * Math.PI + this.rad;
    }

    add(rad: number) {
        return new Rotation(this.rad + rad);
    }

    middle(otherRad: number): Rotation {
        let result: number;

        if (otherRad < this.rad) {
            if (this.rad - otherRad < Math.PI) {
                result = otherRad + this.rad - otherRad;
            } else {
                result = 2 * Math.PI - this.rad + otherRad;
            }
        } else {
            if (otherRad - this.rad < Math.PI) {
                result = this.rad + otherRad - this.rad;
            } else {
                result = 2 * Math.PI - otherRad + this.rad;
            }
        }

        return new Rotation(result);
    }

    diff(otherRad: number): Rotation {
        let result: number;
        if (otherRad > this.rad) {
            const diff = otherRad - this.rad;
            if (diff < Math.PI) {
                result = diff;
            } else {
                result = -(2 * Math.PI - diff);
            }
        } else {
            const diff = this.rad - otherRad;
            if (diff < Math.PI) {
                result = -diff;
            } else {
                result = 2 * Math.PI - diff;
            }
        }

        return new Rotation(result);
    }

    get abs(): Rotation {
        return new Rotation(Math.abs(this.rad));
    }

    toVector3() {
        // somehow rotation is clockwise opposed to the standard counter clockwise direction so rad negation needed
        const matrix = Matrix.RotationY(-this.rad);
        return Vector3.TransformCoordinates(new Vector3(0, 0, 1), matrix);
    }

    static FromVector(vec: Vector2): Rotation {
        return new Rotation(vector2ToRotation(vec));
    }
}