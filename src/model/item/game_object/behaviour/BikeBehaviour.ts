import { BikeStateInfo } from "../../bike/BikeState";
import { CharacterItem } from "../../character/CharacterItem";
import { CharacterBehaviour } from "./CharacterBehaviour";

export class BikeBehaviour extends CharacterBehaviour {
    info: BikeStateInfo;
    character: CharacterItem;
}