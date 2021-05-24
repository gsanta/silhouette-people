import { Axis, Space, Vector3 } from "babylonjs";
import { CharacterItem, PersonItem } from "../CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";
import { vecToRot } from "../../../../helpers";


export class CharacterMover extends MeshMover {
    constructor(character: PersonItem) {
        super(character);
    }

    walk(deltaTime: number) {
        if (this.character.routeWalker && !this.character.routeWalker.isRunning()) {
            return;
        }

        const mesh = this.character.instance.getMesh();
        
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const vel = this.character.velocity.multiply(displacementVec)
        this.character.instance.moveWithCollision(vel);
        this.character.instance.setRotation(vecToRot(vel));
    }
}