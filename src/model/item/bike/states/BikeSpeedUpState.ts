import { BikeItem } from "../../character/CharacterItem";
import { CharacterController } from "../../mesh/CharacterController";
import { BikeState, BikeStateInfo } from "../BikeState";
import { SpeedupSystem } from "../physics/SpeedupSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeIdleState } from "./BikeIdleState";

export class BikeSpeedUpState extends BikeState {
    private readonly bike: BikeItem;
    private readonly mover: CharacterController;
    private readonly speedUpSystem: SpeedupSystem;

    constructor(bike: BikeItem, mover: CharacterController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.speedUpSystem = new SpeedupSystem(this.mover);
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (!bikeStateInfo.isBraking && !bikeStateInfo.isPedalling) {
            this.bike.setState(new BikeIdleState(this.bike, this.mover));
        } else if (bikeStateInfo.isBraking) {
            this.bike.setState(new BikeBrakingState(this.bike, this.mover));
        } else {
            this.speedUpSystem.setGear(bikeStateInfo.gear);
        }
    }

    update(deltaTime: number) {
        this.speedUpSystem.update(deltaTime);
    }
}