import { BikeStateInfo } from "../../bike/BikeState";
import { MeshItem } from "../../mesh/MeshItem";
import { CharacterBehaviour } from "./CharacterBehaviour";

export class BikeBehaviour extends CharacterBehaviour {
    info: BikeStateInfo = new BikeStateInfo();
    character: MeshItem;
}