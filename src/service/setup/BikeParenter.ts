import { Axis, Space, Vector3 } from "babylonjs";
import { BikeController } from "../../model/objects/game_object/types/bike/BikeController";
import { HumanBikingState } from "../../model/objects/game_object/types/human/states/HumanBikingState";
import { BikeIdleState } from "../../model/objects/game_object/types/bike/states/BikeIdleState";
import { GameObject } from "../../model/objects/game_object/GameObject";

export class BikeParenter {
    parentToBike(player: GameObject, bike: GameObject) {
        player.collisionMesh.physicsImpostor.dispose();

        player.mesh.setAbsolutePosition(new Vector3(0, 0, 0));
        player.rotationY = 0;
        player.mesh.parent = bike.mesh;

        player.mesh.checkCollisions = false;
        bike.mesh.checkCollisions = false;
        player.setParent(bike);
        player.mesh.translate(Axis.Y, 0.5, Space.WORLD)
        const bikeWalker = new BikeController(bike);
        player.motionController = bikeWalker;
        bike.motionController = bikeWalker;
        bike.addPositionChangeListener(() => {
            player.emitPositionChange();
        });

        bike.stateController.state = new BikeIdleState(bike, bikeWalker);
        player.stateController.state = new HumanBikingState(player);
    }
}