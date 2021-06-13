import { Vector3 } from "babylonjs";
import { vector3ToRotation } from "../../../../helpers";
import { MotionController } from "../../../objects/game_object/controller_motion/MotionController";
import { GameObject } from "../../../objects/game_object/GameObject";

export class HumanController extends MotionController {
    constructor(character: GameObject) {
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