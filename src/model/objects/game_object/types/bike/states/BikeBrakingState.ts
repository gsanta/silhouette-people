import { lookup } from "../../../../../../service/Lookup";
import { MotionController } from "../../../controller_motion/MotionController";
import { GameObject } from "../../../GameObject";
import { MeshState } from "../../../../../item/mesh/MeshState";
import { BikeStateInfo } from "../BikeStateInfo";
import { BrakingSystem } from "../physics/BrakingSystem";
import { BikeIdleState } from "./BikeIdleState";
import { BikeSpeedUpState } from "./BikeSpeedUpState";

export class BikeBrakingState extends MeshState {
    private readonly bike: GameObject;
    private readonly mover: MotionController;
    private readonly brakeSystem: BrakingSystem;
    private powerBrake = false;

    constructor(bike: GameObject, mover: MotionController) {
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