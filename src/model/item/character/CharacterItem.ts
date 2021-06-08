import { MeshInputManager } from "../../MeshInputManager";
import { MeshState } from "../mesh/MeshState";
import { MeshMover } from "../mesh/MeshMover";
import { MeshItem } from "../mesh/MeshItem";
import { RouteWalker } from "../route/RouteWalker";
import { BikeState, BikeStateInfo } from "../bike/BikeState";
import { Vector3 } from "babylonjs";
import { Rotation } from "../../math/Rotation";
import { toVector2 } from "../../../helpers";

export type PersonItem = CharacterItem;
export type BikeItem = CharacterItem<BikeState, BikeStateInfo>

export class CharacterItem<S extends MeshState = MeshState, I = any> extends MeshItem {
    collisionSensorDistance = 2;
    animationState: S;
    mover: MeshMover;
    inputManager: MeshInputManager;
    routeWalker: RouteWalker;
    info: I;

    _velocity: Vector3 = new Vector3(0, 0, 1);

    setState(state: S) {
        if (this.animationState) {
            this.animationState.exitState();
        }

        this.animationState = state;

        if (this.animationState) {
            this.animationState.enterState();
        }
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
}