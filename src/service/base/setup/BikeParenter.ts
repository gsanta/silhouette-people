import { Vector3 } from "babylonjs";
import { BikeWalker } from "../../../model/object/bike/states/BikeWalker";
import { CharacterBikingState } from "../../../model/object/character/states/CharacterBikingState";
import { BikeObj, HumanoidObj } from "../../../model/object/character/CharacterObj";
import { BikeInputManager } from "../../../model/object/bike/BikeInputManager";
import { KeyboardService } from "../keyboard/KeyboardService";

export class BikeParenter {
    parentToBike(player: HumanoidObj, bike: BikeObj, keyboardService: KeyboardService) {
        player.instance.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.instance.setRotation(0);
        player.instance.getMesh().parent = bike.instance.getMesh();
        player.instance.getMesh().checkCollisions = false;
        player.setParent(bike);
        const bikeWalker = new BikeWalker(bike);
        player.walker = bikeWalker;
        player.inputManager = new BikeInputManager(bikeWalker, keyboardService);
        bike.instance.addPositionChangeListener(() => {
            player.instance.emitPositionChange();
        });

        player.animationState = new CharacterBikingState(player);
    }
}