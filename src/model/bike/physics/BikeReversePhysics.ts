
import { MeshObj } from "../../objs/MeshObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeReversePhysics implements IBikePhysics {
    private gameObj: MeshObj;

    constructor(gameObj: MeshObj) {
        this.gameObj = gameObj;
    }

    update(_deltaTime: number) {
        this.gameObj.data.setSpeed(-2);
    }
}