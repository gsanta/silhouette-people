import { InputController } from "../game_object/input/InputController";
import { MeshState } from "../mesh/MeshState";
import { CharacterController } from "../mesh/CharacterController";
import { MeshItem } from "../mesh/MeshItem";
import { RouteController } from "../route/RouteController";
import { BikeState, BikeStateInfo } from "../bike/BikeState";

export type PersonItem = CharacterItem;
export type BikeItem = CharacterItem<BikeState, BikeStateInfo>

export class CharacterItem<S extends MeshState = MeshState, I = any> extends MeshItem {
    collisionSensorDistance = 2;
    animationState: S;
    characterController: CharacterController;
    inputController: InputController;
    routeController: RouteController;
    info: I;

    setState(state: S) {
        if (this.animationState) {
            this.animationState.exitState();
        }

        this.animationState = state;

        if (this.animationState) {
            this.animationState.enterState();
        }
    }
}