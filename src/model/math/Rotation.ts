import { Matrix, Vector2, Vector3 } from "babylonjs";

export class DIRECTION2 {
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

export class DIRECTION3 {
    static N() {
        return new Vector3(0, 0, 1);
    }

    static S() {
        return new Vector3(0, 0, -1);
    }

    static W() {
        return new Vector3(-1, 0, 0);
    }

    static E() {
        return new Vector3(1, 0, 0);
    }

    static NW() {
        return new Vector3(-1, 0, 1);
    }

    static NE() {
        return new Vector3(1, 0, 1).normalize();
    }

    static SE() {
        return new Vector3(1, 0, -1);
    }
}

export class Rotation {
    readonly rad: number;

    constructor(angle: number) {
        this.rad = angle;
    }

    norm(): Rotation {
        const rad = this.rad >= 2 * Math.PI ? this.rad - 2 * Math.PI : this.rad < 0 ? 2 * Math.PI + this.rad : this.rad;
        return new Rotation(rad);
    }

    worldAngle(): Rotation {
        return new Rotation(this.rad - Math.PI / 2);
    }

    standardAngle(): Rotation {
        return new Rotation(this.rad + Math.PI / 2);
    }

    add(rad: number): Rotation {
        return new Rotation(this.rad + rad);
    }

    isBetween(otherAngle: number, testedAngle: number): boolean {
        let start: number, end: number;

        if (this.diff(otherAngle).rad < 0) {
            start = otherAngle;
            end = this.rad;
        } else {
            start = this.rad;
            end = otherAngle;
        }
        
        if (start >= end) {
            return testedAngle >= start || testedAngle <= end;
        } else {
            return testedAngle >= start && testedAngle <= end;
        }
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

    toVector3(): Vector3 {
        // somehow rotation is clockwise opposed to the standard counter clockwise direction so rad negation needed
        const matrix = Matrix.RotationY(-this.rad);
        return Vector3.TransformCoordinates(new Vector3(0, 0, 1), matrix);
    }

    static FromVector(vec: Vector2): Rotation {
        let angle = Math.atan2(vec.y, vec.x);
        angle = angle >= 0 ? angle : 2 * Math.PI + angle;
        return new Rotation(angle);
    }

    static FromVector3(vec: Vector3): Rotation {
    let angle = Math.atan2(vec.z, vec.x);
        return new Rotation(angle).norm();
    }

    static FromVectors(ve1: Vector2, vec2: Vector2): Rotation {
        const vector = vec2.subtract(ve1);
        return Rotation.FromVector(vector);
    }
}