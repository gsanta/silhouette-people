import { Vector3 } from "babylonjs";
import { BikeWalker } from "../../../model/object/bike/states/BikeWalker";
import { CharacterBikingState } from "../../../model/object/character/states/CharacterBikingState";
import { BikeObj, HumanoidObj } from "../../../model/object/character/CharacterObj";

export class BikeParenter {
    parentToBike(player: HumanoidObj, bike: BikeObj) {
        player.instance.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.instance.setRotation(0);
        player.instance.getMesh().parent = bike.instance.getMesh();
        player.instance.getMesh().checkCollisions = false;
        player.setParent(bike);
        player.walker = new BikeWalker(bike);
        player.inputManager = bike.inputManager;

        player.animationState = new CharacterBikingState(player);
    }
}