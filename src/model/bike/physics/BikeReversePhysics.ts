
import { BikeObj } from "../../general/objs/CharacterObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeReversePhysics implements IBikePhysics {
    private bike: BikeObj;

    constructor(bike: BikeObj) {
        this.bike = bike;
    }

    update(_deltaTime: number) {
        this.bike.walker.setSpeed(-2);
    }
}