import { Axis, Space, Vector3 } from "babylonjs";
import { CharacterItem, PersonItem } from "../CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";
import { vector3ToRotation } from "../../../../helpers";


export class CharacterMover extends MeshMover {
    constructor(character: PersonItem) {
        super(character);
    }

    walk(deltaTime: number) {
        if (this.character.routeWalker && !this.character.routeWalker.isRunning()) {
            return;
        }

        const mesh = this.character.mesh;
        
        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const vel = this.character.velocity.multiply(displacementVec)
        this.character.moveWithCollision(vel);
        this.character.rotation = vector3ToRotation(vel);
    }
}