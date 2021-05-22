import { BikeWalker } from "../states/BikeWalker";
import { AbstractBikePhysics } from "./AbstractBikePhysics";

export class BikeSlowdownPhysics extends AbstractBikePhysics {
    private bikeWalker: BikeWalker;
    private readonly slowdown: number;

    constructor(bikeWalker: BikeWalker, slowdownFactor: number) {
        super();
        this.bikeWalker = bikeWalker;

        this.slowdown = slowdownFactor / 1000;
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.bikeWalker.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.bikeWalker.setSpeed(newSpeed);
    }
}