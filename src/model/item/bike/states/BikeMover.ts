import { Axis, Space, Vector3 } from "babylonjs";
import { rotateVec, vector3ToRotation } from "../../../../helpers";
import { BikeItem, CharacterItem } from "../../character/CharacterItem";
import { MeshMover } from "../../mesh/MeshMover";

export type PedalDirection = 'forward' | 'backward';

export class BikeMover extends MeshMover {
    readonly rotationConst = Math.PI / 30;

    private bike: BikeItem;

    constructor(bike: BikeItem) {
        super(bike);

        this.bike = bike;
    }

    walk(deltaTime: number) {
        const character = <CharacterItem> this.character.children[0];
        if (character.routeWalker && !character.routeWalker.isRunning()) {
            return;
        }

        this.bike.animationState.update(deltaTime);

        if (this.speed > 0) {
            const deltaTimeSec = deltaTime / 1000;
            const displacement = this.speed * deltaTimeSec;
            const displacementVec = new Vector3(displacement, displacement, displacement);
            this.bike.velocity = rotateVec(this.bike.velocity, this.bike.info.steering);
            let vel = this.bike.velocity.multiply(displacementVec);
    
            this.character.moveWithCollision(vel);
            this.character.rotation = vector3ToRotation(vel);
        }
        
    }
}