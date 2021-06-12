import { lookup } from "../../../../service/Lookup";
import { BikeItem } from "../../character/CharacterItem";
import { BikeState, BikeStateInfo } from "../BikeState";
import { BrakingSystem } from "../physics/BrakingSystem";
import { BikeIdleState } from "./BikeIdleState";
import { BikeSpeedUpState } from "./BikeSpeedupState";
import { CharacterController } from "../../mesh/CharacterController";

export class BikeBrakingState extends BikeState {
    private readonly bike: BikeItem;
    private readonly mover: CharacterController;
    private readonly brakeSystem: BrakingSystem;
    private powerBrake = false;

    constructor(bike: BikeItem, mover: CharacterController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.brakeSystem = new BrakingSystem(lookup.worldProvider, bike, this.mover, 1.5);
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        this.powerBrake = bikeStateInfo.isPowerBrakeOn;
        if (!bikeStateInfo.isBraking) {
            if (bikeStateInfo.isPedalling) {
                this.bike.setState(new BikeSpeedUpState(this.bike, this.mover));
            } else {
                this.bike.setState(new BikeIdleState(this.bike, this.mover));
            }
        }
    }

    update(deltaTime: number) {
        this.brakeSystem.break(deltaTime, this.powerBrake);
    }

    enterState() {
        this.brakeSystem.enter();
    }

    exitState() {
        this.brakeSystem.exit();
    }
}