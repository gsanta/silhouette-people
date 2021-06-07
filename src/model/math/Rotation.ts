import { Vector2 } from "babylonjs/Maths/math.vector";
import { vector2ToRotation } from "../../helpers";

export class Rotation {
    readonly rad: number;

    constructor(rad: number) {
        this.rad = rad >= 0 ? rad : 2 * Math.PI + rad;
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

    static FromVector(vec: Vector2): Rotation {
        return new Rotation(vector2ToRotation(vec));
    }
}