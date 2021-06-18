import { BikeStateInfo } from "./BikeStateInfo";
import { GameObject } from "../../GameObject";
import { CharacterBehaviour } from "../../CharacterBehaviour";

export class BikeBehaviour extends CharacterBehaviour {
    info: BikeStateInfo = new BikeStateInfo();
    character: GameObject;
}