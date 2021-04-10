
import { MeshObj } from "../objs/MeshObj";

export class BikeReversePhysics {
    private gameObj: MeshObj;

    constructor(gameObj: MeshObj) {
        this.gameObj = gameObj;
    }

    update(_deltaTime: number) {
        this.gameObj.data.setSpeed(-2);
    }
}