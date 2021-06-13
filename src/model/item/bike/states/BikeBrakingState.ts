import { lookup } from "../../../../service/Lookup";
import { CharacterController } from "../../mesh/CharacterController";
import { MeshItem } from "../../mesh/MeshItem";
import { MeshState } from "../../mesh/MeshState";
import { BikeStateInfo } from "../BikeState";
import { BrakingSystem } from "../physics/BrakingSystem";
import { BikeIdleState } from "./BikeIdleState";
import { BikeSpeedUpState } from "./BikeSpeedupState";

export class BikeBrakingState extends MeshState {
    private readonly bike: MeshItem;
    private readonly mover: CharacterController;
    private readonly brakeSystem: BrakingSystem;
    private powerBrake = false;

    constructor(bike: MeshItem, mover: CharacterController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.brakeSystem = new BrakingSystem(lookup.worldProvider, bike, this.mover, 1.5);
    }

    update(deltaTime: number) {
        this.updateInfo(this.bike.behaviour.info);
        this.brakeSystem.break(deltaTime, this.powerBrake);
    }

    private updateInfo(bikeStateInfo: BikeStateInfo): void {
        this.powerBrake = bikeStateInfo.isPowerBrakeOn;
        if (!bikeStateInfo.isBraking) {
            if (bikeStateInfo.isPedalling) {
                this.bike.stateController.state = new BikeSpeedUpState(this.bike, this.mover);
            } else {
                this.bike.stateController.state = new BikeIdleState(this.bike, this.mover);
            }
        }
    }

    enterState() {
        this.brakeSystem.enter();
    }

    exitState() {
        this.brakeSystem.exit();
    }
}