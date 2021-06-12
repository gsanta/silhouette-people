import { Axis, Space, Vector3 } from "babylonjs";
import { BikeIdleState } from "../../bike/states/BikeIdleState";
import { BikeItem, CharacterItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterIdleState } from "./CharacterIdleState";

export class CharacterGetOffBikeState extends MeshState {
    
    constructor(player: CharacterItem) {
        super(player);
        this.enterState();
    }

    enterState() {
        const player = this.character;
        
        const bike = <BikeItem> player.getParent();
        player.setParent(undefined);

        bike.animationState = new BikeIdleState(bike, bike.characterController);
        player.animationState = new CharacterIdleState(player);
        player.mesh.parent = bike.mesh.parent;
        player.position = bike.position;
        player.rotation = bike.rotation;

        // const dir = player.instance.getRotation().clone();
        // dir.y = 0;
        // player.mesh.translate(dir, 1, Space.WORLD);

        var direction = player.mesh.getDirection(new Vector3(0, 0, 1));
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));

        player.mesh.translate(Axis.X, direction.x * 50, Space.WORLD);
        player.mesh.translate(Axis.Z, direction.z * 50, Space.WORLD);
    }
}