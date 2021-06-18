import { Vector3 } from "babylonjs";
import { rotateVec, vector3ToRotation } from "../../../../../helpers";
import { MotionController } from "../../MotionController";
import { GameObject } from "../../GameObject";

export type PedalDirection = 'forward' | 'backward';

export class BikeController extends MotionController {
    readonly rotationConst = Math.PI / 60;

    private bike: GameObject;

    constructor(bike: GameObject) {
        super(bike);

        this.bike = bike;
    }

    update(deltaTime: number) {
        const character = this.character.children[0];
        if (character.routeController && !character.routeController.isRunning()) {
            return;
        }

        this.bike.stateController.state.update(deltaTime);

        if (this.speed > 0) {
            const deltaTimeSec = deltaTime / 1000;
            const displacement = this.speed * deltaTimeSec;
            const displacementVec = new Vector3(displacement, displacement, displacement);
            this.velocity = rotateVec(this.velocity, this.bike.behaviour.info.steering);
            let vel = this.velocity.multiply(displacementVec);
    
            this.character.moveWithCollision(vel);
            this.character.rotation = vector3ToRotation(vel);
        }
        
    }
}