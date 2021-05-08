
import { BikeWalker } from "../states/BikeWalker";
import { IBikePhysics } from "./IBikePhysics";

export class BikeReversePhysics implements IBikePhysics {
    private bikeWalker: BikeWalker;

    constructor(bikeWalker: BikeWalker) {
        this.bikeWalker = bikeWalker;
    }

    update(_deltaTime: number) {
        this.bikeWalker.setSpeed(-2);
    }
}