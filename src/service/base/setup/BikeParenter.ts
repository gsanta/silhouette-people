import { Vector3 } from "babylonjs";
import { BikeMover } from "../../../model/item/bike/states/BikeMover";
import { CharacterBikingState } from "../../../model/item/character/states/CharacterBikingState";
import { BikeItem, PersonItem } from "../../../model/item/character/CharacterItem";
import { BikeInputManager } from "../../../model/item/bike/BikeInputManager";
import { KeyboardService } from "../keyboard/KeyboardService";
import { GraphService } from "../../graph/GraphService";
import { BikeIdleState } from "../../../model/item/bike/states/BikeIdleState";

export class BikeParenter {
    parentToBike(player: PersonItem, bike: BikeItem, keyboardService: KeyboardService, graphService: GraphService) {
        player.instance.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.instance.setRotation(0);
        player.instance.getMesh().parent = bike.instance.getMesh();
        player.instance.getMesh().checkCollisions = false;
        player.setParent(bike);
        const bikeWalker = new BikeMover(bike);
        player.mover = bikeWalker;
        bike.mover = bikeWalker;
        bike.instance.addPositionChangeListener(() => {
            player.instance.emitPositionChange();
        });

        bike.setState(new BikeIdleState(bike, bikeWalker));

        player.animationState = new CharacterBikingState(player);
    }
}