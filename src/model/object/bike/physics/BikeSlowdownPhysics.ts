import { BikeObj } from "../../character/CharacterObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeSlowdownPhysics implements IBikePhysics {
    private bike: BikeObj;
    private readonly slowdown: number;

    constructor(bike: BikeObj, slowdownFactor: number) {
        this.bike = bike;

        this.slowdown = slowdownFactor / 1000;
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.bike.walker.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.bike.walker.setSpeed(newSpeed);
    }
}