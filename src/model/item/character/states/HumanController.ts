import { Vector3 } from "babylonjs";
import { vector3ToRotation } from "../../../../helpers";
import { CharacterController } from "../../mesh/CharacterController";
import { MeshItem } from "../../mesh/MeshItem";

export class HumanController extends CharacterController {
    constructor(character: MeshItem) {
        super(character);
    }

    walk(deltaTime: number) {
        if (this.character.routeController && !this.character.routeController.isRunning()) {
            return;
        }

        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const vel = this.velocity.multiply(displacementVec)
        this.character.moveWithCollision(vel);
        this.character.rotation = vector3ToRotation(vel);
    }
}