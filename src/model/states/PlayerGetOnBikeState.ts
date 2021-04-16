import { Vector3 } from "babylonjs";
import { BikeMovingState } from "../bike/BikeMovingState";
import { Bike, Character } from "../objs/MeshObj";
import { PlayerBikeState } from "./PlayerBikeState";
import { PlayerState } from "./PlayerState";

export class PlayerGetOnBikeState extends PlayerState {
    private bike: Bike;

    constructor(player: Character, bike: Bike) {
        super(player);
        this.bike = bike;
    }

    enterState() {
        const player = this.player;

        // player.tag.removePlayer();
        // const highlightAddon = player.addon.getByName(AddonName.Highlight);
        // player.addon.remove(highlightAddon);
        player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.setRotation(0);
        player.getMesh().parent = this.bike.getMesh();
        player.getMesh().checkCollisions = false;
        player.player.setVehicle(this.bike);

        player.state = new PlayerBikeState(player);
        this.bike.state = new BikeMovingState(this.bike);
        // this.bike.tag.addPlayer();
        // this.bike.addon.add(highlightAddon);
    }
}