import { Vector3 } from "babylonjs";
import { toVector2 } from "../../../../helpers";
import { Rotation } from "../../../math/Rotation";
import { GameObject } from "../GameObject";

export abstract class MotionController {
    protected _isDirty = false;
    protected speed = 0;
    protected rotation = 0;
    private _velocity: Vector3 = new Vector3(0, 0, 1);
    readonly character: GameObject;

    constructor(character: GameObject) {
        this.character = character;
    }

    setSpeed(speed: number) {
        if (this.speed !== speed) {
            this._isDirty = true;
            this.speed = speed;
        }
    }

    getSpeed(): number {
        return this.speed;
    }

    setRotation(rotation: number) {
        if (this.rotation !== rotation) {
            this._isDirty = true;
            this.rotation = rotation;
        }
    }

    getRotation(): number {
        return this.rotation;
    }

    set velocity(vector: Vector3) {
        this._velocity = vector;
    }

    get velocity(): Vector3 {
        return this._velocity;
    }

    get rotationRad(): number {
        return Rotation.FromVector(toVector2(this.velocity)).rad;
    }

    abstract walk(deltaTime: number);
}