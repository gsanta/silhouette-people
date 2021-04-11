import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { Vector3 } from "babylonjs";
import { PlayerBikeState } from "./PlayerBikeState";
import { BikeMovingState } from "./BikeMovingState";

export class PlayerGetOnBikeState extends AbstractMeshObjState {
    private bike: MeshObj;

    constructor(gameObject: MeshObj, bike: MeshObj) {
        super(MeshObjStateName.PlayerGetOnBikeState, gameObject);
        this.bike = bike;
    }

    enter() {
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