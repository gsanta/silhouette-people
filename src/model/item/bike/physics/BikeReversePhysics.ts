
import { BikeWalker } from "../states/BikeWalker";
import { AbstractBikePhysics } from "./AbstractBikePhysics";

export class BikeReversePhysics extends AbstractBikePhysics {
    private bikeWalker: BikeWalker;

    constructor(bikeWalker: BikeWalker) {
        super();
        this.bikeWalker = bikeWalker;
    }

    update(_deltaTime: number) {
        this.bikeWalker.setSpeed(-2);
    }
}