import { Axis, Space, Vector3 } from "babylonjs";
import { BikeIdleState } from "../../bike/states/BikeIdleState";
import { BikeObj, CharacterObj } from "../CharacterObj";
import { MeshState } from "../../mesh/MeshState";
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
        player.instance.getMesh().parent = bike.instance.getMesh().parent;
        player.instance.setPosition(bike.getPosition());
        player.instance.setRotation(bike.instance.getRotation().y);

        const dir = player.instance.getRotation().clone();
        dir.y = 0;
        player.instance.getMesh().translate(dir, 1, Space.WORLD);

        var direction = player.instance.getMesh().getDirection(new Vector3(0, 0, 1));
        direction.normalize().multiplyInPlace(new Vector3(0.04, 0.04, 0.04));

        player.instance.getMesh().translate(Axis.X, direction.x * 50, Space.WORLD);
        player.instance.getMesh().translate(Axis.Z, direction.z * 50, Space.WORLD);
    }
}