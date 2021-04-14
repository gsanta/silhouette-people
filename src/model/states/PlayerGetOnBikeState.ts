import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "./AbstractMeshState";
import { Vector3 } from "babylonjs";
import { PlayerBikeState } from "./PlayerBikeState";
import { BikeMovingState } from "../bike/BikeMovingState";

export class PlayerGetOnBikeState extends AbstractMeshState {
    private bike: MeshObj;

    constructor(gameObject: MeshObj, bike: MeshObj) {
        super(MeshStateName.PlayerGetOnBikeState, gameObject);
        this.bike = bike;
    }

    enterState() {
        const player = this.gameObject;

        // player.tag.removePlayer();
        // const highlightAddon = player.addon.getByName(AddonName.Highlight);
        // player.addon.remove(highlightAddon);
        player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        player.setRotation(0);
        player.getMesh().parent = this.bike.getMesh();
        player.getMesh().checkCollisions = false;
        player.player.setVehicle(this.bike);

        player.state.setState(new PlayerBikeState(player));
        this.bike.state.setState(new BikeMovingState(this.bike));
        // this.bike.tag.addPlayer();
        // this.bike.addon.add(highlightAddon);
    }
}