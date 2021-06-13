import { Axis, Space, Vector3 } from "babylonjs";
import { rotateVec, vector3ToRotation } from "../../../../helpers";
import { BikeItem, CharacterItem } from "../../character/CharacterItem";
import { CharacterController } from "../../mesh/CharacterController";

export type PedalDirection = 'forward' | 'backward';

export class BikeController extends CharacterController {
    readonly rotationConst = Math.PI / 30;

    private bike: BikeItem;

    constructor(bike: BikeItem) {
        super(bike);

        this.bike = bike;
    }

    walk(deltaTime: number) {
        const character = <CharacterItem> this.character.children[0];
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