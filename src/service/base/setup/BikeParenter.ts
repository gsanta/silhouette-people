import { Vector3 } from "babylonjs";
import { BikeController } from "../../../model/objects/game_object/types/bike/BikeController";
import { CharacterBikingState } from "../../../model/item/character/states/CharacterBikingState";
import { BikeIdleState } from "../../../model/objects/game_object/types/bike/states/BikeIdleState";
import { GameObject } from "../../../model/objects/game_object/GameObject";

export class BikeParenter {
    parentToBike(player: GameObject, bike: GameObject) {
        player.mesh.setAbsolutePosition(new Vector3(0, 0, 0));
        player.rotation = 0;
        player.mesh.parent = bike.mesh;
        player.mesh.checkCollisions = false;
        player.setParent(bike);
        const bikeWalker = new BikeController(bike);
        player.characterController = bikeWalker;
        bike.characterController = bikeWalker;
        bike.addPositionChangeListener(() => {
            player.emitPositionChange();
        });

        bike.stateController.state = new BikeIdleState(bike, bikeWalker);
        player.stateController.state = new CharacterBikingState(player);
    }
}