import { BikeMovingState } from "./BikeMovingState";
import { BikeState } from "./BikeState";

export class BikeIdleState extends BikeState {
    setPedalling(isPedalling: boolean) {
        super.setPedalling(isPedalling);

        return isPedalling ? this.copyTo(new BikeMovingState(this.meshObj)) : this;
    }
}