import { MotionController } from "../../../controller_motion/MotionController";
import { GameObject } from "../../../GameObject";
import { MeshState } from "../../../../../item/mesh/MeshState";
import { BikeStateInfo } from "../BikeStateInfo";
import { SpeedupSystem } from "../physics/SpeedupSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeIdleState } from "./BikeIdleState";

export class BikeSpeedUpState extends MeshState {
    private readonly bike: GameObject;
    private readonly mover: MotionController;
    private readonly speedUpSystem: SpeedupSystem;

    constructor(bike: GameObject, mover: MotionController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.speedUpSystem = new SpeedupSystem(this.mover);
    }

    update(deltaTime: number) {
        this.updateInfo(this.bike.behaviour.info);
        this.speedUpSystem.update(deltaTime);
    }

    private updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (!bikeStateInfo.isBraking && !bikeStateInfo.isPedalling) {
            this.bike.stateController.state = new BikeIdleState(this.bike, this.mover);
        } else if (bikeStateInfo.isBraking) {
            this.bike.stateController.state = new BikeBrakingState(this.bike, this.mover);
        } else {
            this.speedUpSystem.setGear(bikeStateInfo.gear);
        }
    }
}