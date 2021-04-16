import { Axis, Space, Vector3 } from "babylonjs";
import { BikeIdleState } from "../bike/BikeIdleState";
import { Character } from "../objs/MeshObj";
import { PlayerIdleState } from "./PlayerIdleState";
import { PlayerState } from "./PlayerState";

export class PlayerGetOffBikeState extends PlayerState {

    constructor(player: Character) {
        super(player);
    }

    enterState() {
        const player = this.player;
        
        const vehicle = player.player.getBike();
        player.player.setVehicle(undefined);

        vehicle.state = new BikeIdleState(vehicle);
        player.state = new PlayerIdleState(player);
        player.getMesh().parent = vehicle.getMesh().parent;
        player.mesh.setPosition(vehicle.getPosition());
        player.setRotation(vehicle.mesh.getRotation().y);

        const dir = player.mesh.getRotation().clone();
        dir.y = 0;
        player.getMesh().translate(dir, 1, Space.WORLD);

        var direction = player.mainMesh.getDirection(new Vector3(0, 0, 1));
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));

        player.getMesh().translate(Axis.X, direction.x * 50, Space.WORLD);
        player.getMesh().translate(Axis.Z, direction.z * 50, Space.WORLD);

        // player.getMesh().moveWithCollisions(direction);

        // player.tag.removePlayer();
        // const highlightAddon = player.addon.getByName(AddonName.Highlight);
        // player.addon.remove(highlightAddon);
        // player.getMesh().setAbsolutePosition(new Vector3(0, 0, 0));
        // player.setRotation(0);
        // player.getMesh().parent = this.bike.getMesh();
        // player.getMesh().checkCollisions = false;
        // player.state.setState(new PlayerBikeState(player));
        
        // this.bike.tag.addPlayer();
        // this.bike.addon.add(highlightAddon);
        // this.bike.state.setState(new BikeMovingState(this.bike, this.world));
    }
}