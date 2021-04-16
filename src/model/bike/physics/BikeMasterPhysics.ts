import { Bike, MeshObj } from "../../objs/MeshObj";
import { BikeState } from "../BikeState";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeSpeedupPhysics } from "./BikeSpeedupPhysics";
import { IBikePhysics } from "./IBikePhysics";


export class BikeMasterPhysics implements IBikePhysics {
    private bike: Bike;

    private speedUpPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeSlowdownPhysics;
    private reversePhysics: BikeReversePhysics;


    constructor(bike: Bike) {
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
        const speed = this.bike.state.getSpeed();
        if (this.bike.state.isBraking()) {
            return this.brakingPhysics;
        } else if (this.bike.state.isPedalling()) {
            if (this.bike.state.getPedalDirection() === 'forward') {
                return this.speedUpPhysics;
            } else if (speed <= 0) {
                return this.reversePhysics;
            }
        } else {
            return this.rollingPhysics;
        }
    }
}