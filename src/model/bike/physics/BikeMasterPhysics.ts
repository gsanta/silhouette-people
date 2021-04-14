import { MeshObj } from "../../objs/MeshObj";
import { BikeState } from "../BikeState";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeSpeedupPhysics } from "./BikeSpeedupPhysics";
import { IBikePhysics } from "./IBikePhysics";


export class BikeMasterPhysics implements IBikePhysics {
    private bikeState: BikeState;
    private bike: MeshObj;

    private speedUpPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeSlowdownPhysics;
    private reversePhysics: BikeReversePhysics;


    constructor(bikeState: BikeState, bike: MeshObj) {
        this.bikeState = bikeState;
        this.bike = bike;

        this.speedUpPhysics = new BikeSpeedupPhysics(bike);
        this.rollingPhysics = new BikeSlowdownPhysics(bike, 2.5);
        this.brakingPhysics = new BikeSlowdownPhysics(bike, 5);
        this.reversePhysics = new BikeReversePhysics(bike);
    }

    update(deltaTime: number) {
        this.determinePhysics().update(deltaTime);
    }

    private determinePhysics(): IBikePhysics {
        const speed = this.bike.data.getSpeed();
        if (this.bikeState.isBraking()) {
            return this.brakingPhysics;
        } else if (this.bikeState.isPedalling()) {
            if (this.bikeState.getPedalDirection() === 'forward') {
                return this.speedUpPhysics;
            } else if (speed <= 0) {
                return this.reversePhysics;
            }
        } else {
            return this.rollingPhysics;
        }
    }
}