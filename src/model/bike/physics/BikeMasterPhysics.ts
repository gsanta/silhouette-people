import { BikeObj } from "../../general/objs/CharacterObj";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeSpeedupPhysics } from "./BikeSpeedupPhysics";
import { IBikePhysics } from "./IBikePhysics";


export class BikeMasterPhysics implements IBikePhysics {
    private bike: BikeObj;

    private speedUpPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeSlowdownPhysics;
    private reversePhysics: BikeReversePhysics;


    constructor(bike: BikeObj) {
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
        const speed = this.bike.walker.getSpeed();
        if (this.bike.walker.isBraking()) {
            return this.brakingPhysics;
        } else if (this.bike.walker.isPedalling()) {
            if (this.bike.walker.getPedalDirection() === 'forward') {
                return this.speedUpPhysics;
            } else if (speed <= 0) {
                return this.reversePhysics;
            }
        } else {
            return this.rollingPhysics;
        }
    }
}