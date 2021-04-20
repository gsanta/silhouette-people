import { Vector3 } from "babylonjs";
import { BikeMovingState } from "../../bike/BikeMovingState";
import { BikeObj, HumanoidObj } from "../../general/objs/CharacterObj";
import { MeshState } from "../../general/state/MeshState";
import { CharacterBikingState } from "./CharacterBikingState";

export class CharacterGetOnBikeState extends MeshState {
    private bike: BikeObj;

    constructor(player: HumanoidObj, bike: BikeObj) {
        super(player);
        this.bike = bike;
        this.enterState();
    }

    enterState() {
        const player = this.character;

        player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.setRotation(0);
        player.getMesh().parent = this.bike.getMesh();
        player.getMesh().checkCollisions = false;
        player.setParent(this.bike);

        player.state = new CharacterBikingState(player);
        this.bike.state = new BikeMovingState(this.bike);
    }
}