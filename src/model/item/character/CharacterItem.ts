import { InputController } from "../game_object/input/InputController";
import { MeshState } from "../mesh/MeshState";
import { CharacterController } from "../mesh/CharacterController";
import { MeshItem } from "../mesh/MeshItem";
import { RouteController } from "../route/RouteController";
import { BikeState, BikeStateInfo } from "../bike/BikeState";
import { CharacterBehaviour } from "../game_object/behaviour/CharacterBehaviour";
import { BikeBehaviour } from "../game_object/behaviour/BikeBehaviour";
import { StateController } from "../game_object/state/StateController";

export type PersonItem = CharacterItem;
export type BikeItem = CharacterItem<BikeBehaviour>

export class CharacterItem<B extends CharacterBehaviour = any> extends MeshItem {
    collisionSensorDistance = 2;
    stateController: StateController;
    characterController: CharacterController;
    inputController: InputController;
    routeController: RouteController;

    behaviour: B;
}