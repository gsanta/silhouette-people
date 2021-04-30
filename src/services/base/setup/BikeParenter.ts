import { Vector3 } from "babylonjs";
import { BikeWalker } from "../../../model/bike/BikeWalker";
import { CharacterBikingState } from "../../../model/character/states/CharacterBikingState";
import { BikeObj, HumanoidObj } from "../../../model/general/objs/CharacterObj";

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