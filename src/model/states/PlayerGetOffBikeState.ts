import { GameObj } from "../objs/GameObj";
import { Lookup } from "../../services/Lookup";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { AddonName } from "../addons/AbstractAddon";
import { Axis, Space, Vector3 } from "babylonjs";
import { PlayerBikeState } from "./PlayerBikeState";
import { BikeMovingState } from "./BikeMovingState";
import { PlayerIdleState } from "./PlayerIdleState";
import { BikeIdleState } from "./BikeIdleState";

export class PlayerGetOffBikeState extends AbstractGameObjState {
    private world: Lookup;

    constructor(gameObject: GameObj, world: Lookup) {
        super(GameObjStateName.PlayerGetOnBikeState, gameObject);
        this.world = world;
    }

    enter() {
        const player = this.gameObject;
        
        const vehicle = player.player.getVehicle();
        player.player.setVehicle(undefined);

        vehicle.state.setState(new BikeIdleState(vehicle, this.world));
        player.state.setState(new PlayerIdleState(player, this.world));
        player.getMesh().parent = vehicle.getMesh().parent;
        player.mesh.setPosition(vehicle.getPosition());
        player.setRotation(vehicle.mesh.getRotation().y);

        const dir = player.mesh.getRotation().clone();
        dir.y = 0;
        player.getMesh().translate(dir, 1, Space.WORLD);

        var direction = this.gameObject.mainMesh.getDirection(new Vector3(0, 0, 1));
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