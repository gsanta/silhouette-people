import { MotionController } from "../../../controller_motion/MotionController";
import { BikeController } from "../BikeController";
import { AbstractBikePhysics } from "./AbstractBikePhysics";

export class RollingSystem extends AbstractBikePhysics {
    private mover: MotionController;
    private readonly slowdown: number;

    constructor(mover: MotionController, slowdownFactor: number) {
        super();
        this.mover = mover;

        this.slowdown = slowdownFactor / 1000;
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.mover.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.mover.setSpeed(newSpeed);
    }
}