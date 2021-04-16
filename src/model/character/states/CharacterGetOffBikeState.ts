import { Axis, Space, Vector3 } from "babylonjs";
import { BikeIdleState } from "../../bike/BikeIdleState";
import { Character } from "../../general/objs/MeshObj";
import { CharacterIdleState } from "./CharacterIdleState";
import { CharacterState } from "./CharacterState";

export class CharacterGetOffBikeState extends CharacterState {
    
    constructor(player: Character) {
        super(player);
        this.enterState();
    }

    enterState() {
        const player = this.meshObj;
        
        const vehicle = player.player.getBike();
        player.player.setVehicle(undefined);

        vehicle.state = new BikeIdleState(vehicle);
        player.state = new CharacterIdleState(player);
        player.getMesh().parent = vehicle.getMesh().parent;
        player.setPosition(vehicle.getPosition());
        player.setRotation(vehicle.getRotation().y);

        const dir = player.getRotation().clone();
        dir.y = 0;
        player.getMesh().translate(dir, 1, Space.WORLD);

        var direction = player.mainMesh.getDirection(new Vector3(0, 0, 1));
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));

        player.getMesh().translate(Axis.X, direction.x * 50, Space.WORLD);
        player.getMesh().translate(Axis.Z, direction.z * 50, Space.WORLD);
    }
}