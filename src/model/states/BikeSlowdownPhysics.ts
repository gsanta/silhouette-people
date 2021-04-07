import { GameObj } from "../objs/GameObj";

export class BikeSlowdownPhysics {
    private gameObj: GameObj;
    private readonly slowdown: number;

    constructor(gameObj: GameObj, slowdownFactor: number) {
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