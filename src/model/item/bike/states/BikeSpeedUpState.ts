import { BikeItem } from "../../character/CharacterItem";
import { BikeState, BikeStateInfo } from "../BikeState";
import { BikeSpeedupPhysics } from "../physics/BikeSpeedupPhysics";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeIdleState } from "./BikeIdleState";

export class BikeSpeedUpState extends BikeState {
    private readonly bike: BikeItem;
    private readonly speedUpSystem: BikeSpeedupPhysics;

    constructor(bike: BikeItem) {
        super(bike);
        this.bike = bike;
        this.speedUpSystem = new BikeSpeedupPhysics(this.bike.walker);
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (!bikeStateInfo.isBreaking && !bikeStateInfo.isPedalling) {
            this.bike.setState(new BikeIdleState(this.bike));
        } else if (bikeStateInfo.isBreaking) {
            this.bike.setState(new BikeBrakingState(this.bike));
        } else {
            this.speedUpSystem.setGear(bikeStateInfo.gear);
        }
    }

    update(deltaTime: number) {
        this.speedUpSystem.update(deltaTime);
    }
}