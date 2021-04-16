import { Bike } from "../../general/objs/MeshObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeSlowdownPhysics implements IBikePhysics {
    private bike: Bike;
    private readonly slowdown: number;

    constructor(bike: Bike, slowdownFactor: number) {
        this.bike = bike;

        this.slowdown = slowdownFactor / 1000;
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.bike.state.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.bike.state.setSpeed(newSpeed);
    }
}