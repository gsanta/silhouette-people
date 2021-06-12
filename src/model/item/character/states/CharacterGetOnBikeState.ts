import { Vector3 } from "babylonjs";
import { BikeItem, PersonItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterBikingState } from "./CharacterBikingState";
import { BikeIdleState } from "../../bike/states/BikeIdleState";
import { BikeController } from "../../bike/states/BikeController";

export class CharacterGetOnBikeState extends MeshState {
    private bike: BikeItem;

    constructor(player: PersonItem, bike: BikeItem) {
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

        player.animationState = new CharacterBikingState(player);
        this.bike.animationState = new BikeIdleState(this.bike, <BikeController> player.characterController);
    }
}