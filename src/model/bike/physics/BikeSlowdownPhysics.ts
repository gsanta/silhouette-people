import { MeshObj } from "../../objs/MeshObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeSlowdownPhysics implements IBikePhysics {
    private gameObj: MeshObj;
    private readonly slowdown: number;

    constructor(gameObj: MeshObj, slowdownFactor: number) {
        this.gameObj = gameObj;

        this.slowdown = slowdownFactor / 1000;
    }

    update(deltaTime: number) {
        const slowdownAmount = deltaTime * this.slowdown;
        const speed = this.gameObj.data.getSpeed();
        let newSpeed = speed - slowdownAmount;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        this.gameObj.data.setSpeed(newSpeed);
    }
}