import { Vector3 } from "babylonjs";
import { BikeMovingState } from "../../bike/BikeMovingState";
import { Bike, Character } from "../../general/objs/MeshObj";
import { CharacterBikingState } from "./CharacterBikingState";
import { CharacterState } from "./CharacterState";

export class CharacterGetOnBikeState extends CharacterState {
    private bike: Bike;

    constructor(player: Character, bike: Bike) {
        super(player);
        this.bike = bike;
        this.enterState();
    }

    enterState() {
        const player = this.meshObj;

        player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.setRotation(0);
        player.getMesh().parent = this.bike.getMesh();
        player.getMesh().checkCollisions = false;
        player.player.setVehicle(this.bike);

        player.state = new CharacterBikingState(player);
        this.bike.state = new BikeMovingState(this.bike);
    }
}