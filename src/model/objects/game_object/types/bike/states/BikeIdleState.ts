import { MotionController } from "../../../MotionController";
import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { BikeStateInfo } from "../BikeStateInfo";
import { RollingSystem } from "../physics/RollingSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeSpeedUpState } from "./BikeSpeedUpState";

export class BikeIdleState extends GameObjectState {
    private readonly bike: GameObject;
    private readonly mover: MotionController;
    private readonly rollingSystem: RollingSystem;

    constructor(bike: GameObject, mover: MotionController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.rollingSystem = new RollingSystem(this.bike.motionController, 1)
    }
    
    update(deltaTime: number) {
        this.updateInfo(this.bike.behaviour.info);
        this.rollingSystem.update(deltaTime);
    }

    private updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (bikeStateInfo.isBraking) {
            this.bike.stateController.state = new BikeBrakingState(this.bike, this.mover);
        } else if (bikeStateInfo.isPedalling) {
            this.bike.stateController.state = new BikeSpeedUpState(this.bike, this.mover);
        }
    }
}