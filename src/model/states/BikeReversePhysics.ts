
import { GameObj } from "../objs/GameObj";

export class BikeReversePhysics {
    private gameObj: GameObj;

    constructor(gameObj: GameObj) {
        this.gameObj = gameObj;
    }

    update(_deltaTime: number) {
        this.gameObj.data.setSpeed(-2);
    }
}