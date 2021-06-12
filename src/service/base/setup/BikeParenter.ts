import { Vector3 } from "babylonjs";
import { BikeController } from "../../../model/item/bike/states/BikeController";
import { CharacterBikingState } from "../../../model/item/character/states/CharacterBikingState";
import { BikeItem, PersonItem } from "../../../model/item/character/CharacterItem";
import { KeyboardService } from "../keyboard/KeyboardService";
import { GraphService } from "../../graph/GraphService";
import { BikeIdleState } from "../../../model/item/bike/states/BikeIdleState";

export class BikeParenter {
    parentToBike(player: PersonItem, bike: BikeItem, keyboardService: KeyboardService, graphService: GraphService) {
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

        bike.setState(new BikeIdleState(bike, bikeWalker));

        player.animationState = new CharacterBikingState(player);
    }
}