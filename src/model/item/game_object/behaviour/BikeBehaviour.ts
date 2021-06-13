import { BikeStateInfo } from "../../../objects/game_object/types/bike/BikeStateInfo";
import { GameObject } from "../../../objects/game_object/GameObject";
import { CharacterBehaviour } from "../../../objects/game_object/CharacterBehaviour";

export class BikeBehaviour extends CharacterBehaviour {
    info: BikeStateInfo = new BikeStateInfo();
    character: GameObject;
}