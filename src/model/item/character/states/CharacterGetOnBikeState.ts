import { Vector3 } from "babylonjs";
import { MeshState } from "../../mesh/MeshState";
import { CharacterBikingState } from "./CharacterBikingState";
import { BikeIdleState } from "../../../objects/game_object/types/bike/states/BikeIdleState";
import { BikeController } from "../../../objects/game_object/types/bike/BikeController";
import { GameObject } from "../../../objects/game_object/GameObject";

export class CharacterGetOnBikeState extends MeshState {
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

        player.stateController.state = new CharacterBikingState(player);
        this.bike.stateController.state = new BikeIdleState(this.bike, <BikeController> player.motionController);
    }
}