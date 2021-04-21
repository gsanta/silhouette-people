import { Axis, Space, Vector3 } from "babylonjs";
import { BikeIdleState } from "../../bike/BikeIdleState";
import { BikeObj, CharacterObj } from "../../general/objs/CharacterObj";
import { MeshState } from "../../general/state/MeshState";
import { CharacterIdleState } from "./CharacterIdleState";

export class CharacterGetOffBikeState extends MeshState {
    
    constructor(player: CharacterObj) {
        super(player);
        this.enterState();
    }

    enterState() {
        const player = this.character;
        
        const bike = <BikeObj> player.getParent();
        player.setParent(undefined);

        bike.animationState = new BikeIdleState(bike);
        player.animationState = new CharacterIdleState(player);
        player.getMesh().parent = bike.getMesh().parent;
        player.setPosition(bike.getPosition());
        player.setRotation(bike.getRotation().y);

        const dir = player.getRotation().clone();
        dir.y = 0;
        player.getMesh().translate(dir, 1, Space.WORLD);

        var direction = player.mainMesh.getDirection(new Vector3(0, 0, 1));
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));

        player.getMesh().translate(Axis.X, direction.x * 50, Space.WORLD);
        player.getMesh().translate(Axis.Z, direction.z * 50, Space.WORLD);
    }
}