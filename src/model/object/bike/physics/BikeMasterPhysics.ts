import { BikeWalker } from "../states/BikeWalker";
import { BikeReversePhysics } from "./BikeReversePhysics";
import { BikeSlowdownPhysics } from "./BikeSlowdownPhysics";
import { BikeSpeedupPhysics } from "./BikeSpeedupPhysics";
import { IBikePhysics } from "./IBikePhysics";


export class BikeMasterPhysics implements IBikePhysics {
    private bikeWalker: BikeWalker;

    private speedUpPhysics: BikeSpeedupPhysics;
    private rollingPhysics: BikeSlowdownPhysics;
    private brakingPhysics: BikeSlowdownPhysics;
    private reversePhysics: BikeReversePhysics;


    constructor(bikeWalker: BikeWalker) {
        this.bikeWalker = bikeWalker;

        this.speedUpPhysics = new BikeSpeedupPhysics(this.bikeWalker);
        this.rollingPhysics = new BikeSlowdownPhysics(this.bikeWalker, 2.5);
        this.brakingPhysics = new BikeSlowdownPhysics(this.bikeWalker, 5);
        this.reversePhysics = new BikeReversePhysics(this.bikeWalker);
    }

    update(deltaTime: number) {
        this.determinePhysics().update(deltaTime);
    }

    private determinePhysics(): IBikePhysics {
        const speed = this.bikeWalker.getSpeed();
        if (this.bikeWalker.isBraking()) {
            return this.brakingPhysics;
        } else if (this.bikeWalker.isPedalling()) {
            if (this.bikeWalker.getPedalDirection() === 'forward') {
                return this.speedUpPhysics;
            } else if (speed <= 0) {
                return this.reversePhysics;
            }
        } else {
            return this.rollingPhysics;
        }
    }
}