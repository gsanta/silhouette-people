
import { Bike, MeshObj } from "../../objs/MeshObj";
import { IBikePhysics } from "./IBikePhysics";

export class BikeReversePhysics implements IBikePhysics {
    private bike: Bike;

    constructor(bike: Bike) {
        this.bike = bike;
    }

    update(_deltaTime: number) {
        this.bike.state.setSpeed(-2);
    }
}