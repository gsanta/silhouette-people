import { Vector3 } from "babylonjs";
import { rotateVec, toVector2 } from "../../../helpers";
import { MonoBehaviour } from "../../behaviours/MonoBehaviour";
import { MonoBehaviourName } from "../../behaviours/MonoBehaviourName";
import { Rotation } from "../../math/Rotation";
import { GameObject } from "./GameObject";

export abstract class MotionFilter {
    filterDirection(direction: Vector3) { return direction; }
}

export abstract class MotionController extends MonoBehaviour {
    readonly character: GameObject;
    protected _isDirty = false;
    protected speed = 0;
    protected rotation = 0;
    private _steering: number = 0;
    private _direction: Vector3 = new Vector3(0, 0, 1);
    private filters: MotionFilter[] = [];

    constructor(character: GameObject) {
        super(MonoBehaviourName.MOTION_CONTROLLER);
        this.character = character;
    }

    get steering() {
        return this._steering;
    }

    set steering(steering: number) {
        this._steering = steering;
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

    set direction(vector: Vector3) {
        this._direction = vector;
    }

    get direction(): Vector3 {
        return this._direction;
    }

    get rotationRad(): number {
        return Rotation.FromVector(toVector2(this.direction)).rad;
    }

    addFilter(filter: MotionFilter) {
        this.filters.push(filter);
    }

    removeFilter(filter: MotionFilter) {
        this.filters = this.filters.filter(f => f !== filter);
    }

    updateDirection(deltaTime: number): Vector3 {
        let direction = this.direction;
        if (this.speed > 0) {
            direction = rotateVec(this.direction, this.steering);
        }

        for (const filter of this.filters) {
            direction = filter.filterDirection(direction);
        }

        return  direction;
    }
}