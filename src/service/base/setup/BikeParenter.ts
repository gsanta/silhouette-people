import { Vector3 } from "babylonjs";
import { BikeController } from "../../../model/item/bike/states/BikeController";
import { CharacterBikingState } from "../../../model/item/character/states/CharacterBikingState";
import { BikeIdleState } from "../../../model/item/bike/states/BikeIdleState";
import { MeshItem } from "../../../model/item/mesh/MeshItem";

export class BikeParenter {
    parentToBike(player: MeshItem, bike: MeshItem) {
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