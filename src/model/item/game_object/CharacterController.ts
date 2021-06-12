import { Vector3 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { Rotation } from "../../math/Rotation";


export class CharacterController {
    private _velocity: Vector3 = new Vector3(0, 0, 1);


    set velocity(vector: Vector3) {
        this._velocity = vector;
    }

    get velocity(): Vector3 {
        return this._velocity;
    }

    get rotationRad(): number {
        return Rotation.FromVector(toVector2(this.velocity)).rad;
    }
}