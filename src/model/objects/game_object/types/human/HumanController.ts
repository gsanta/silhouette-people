import { Vector3 } from "babylonjs";
import { vector3ToRotation } from "../../../../../helpers";
import { GameObject } from "../../GameObject";
import { MotionController } from "../../MotionController";

export class HumanController extends MotionController {
    constructor(character: GameObject) {
        super(character);
    }

    update(deltaTime: number) {
        if (this.character.routeController && !this.character.routeController.isRunning()) {
            return;
        }

        const deltaTimeSec = deltaTime / 1000;
        const displacement = this.speed * deltaTimeSec;
        const displacementVec = new Vector3(displacement, displacement, displacement);
        const vel = this.direction.multiply(displacementVec)
        this.character.moveWithCollision(vel);
        this.character.rotationY = vector3ToRotation(vel);
    }
}