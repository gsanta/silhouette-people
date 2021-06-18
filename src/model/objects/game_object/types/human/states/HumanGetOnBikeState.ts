import { Vector3 } from "babylonjs";
import { GameObjectState } from "../../../GameObjectState";
import { HumanBikingState } from "./HumanBikingState";
import { BikeIdleState } from "../../bike/states/BikeIdleState";
import { BikeController } from "../../bike/BikeController";
import { GameObject } from "../../../GameObject";

export class HumanGetOnBikeState extends GameObjectState {
    private bike: GameObject;

    constructor(player: GameObject, bike: GameObject) {
        super(player);
        this.bike = bike;
        this.enterState();
    }

    enterState() {
        const player = this.character;

        player.mesh.setAbsolutePosition(new Vector3(0, 0, 0));
        player.rotation = 0;;
        player.mesh.parent = this.bike.mesh;
        player.mesh.checkCollisions = false;
        player.setParent(this.bike);

        player.stateController.state = new HumanBikingState(player);
        this.bike.stateController.state = new BikeIdleState(this.bike, <BikeController> player.motionController);
    }
}