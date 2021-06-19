import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { SpeedupSystem } from "../physics/SpeedupSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeIdleState } from "./BikeIdleState";
import { BikeController } from "../BikeController";

export class BikeSpeedUpState extends GameObjectState {
    private readonly bike: GameObject;
    private readonly motionController: BikeController;
    private readonly speedUpSystem: SpeedupSystem;

    constructor(bike: GameObject, motionController: BikeController) {
        super(bike);
        this.bike = bike;
        this.motionController = motionController;
        this.speedUpSystem = new SpeedupSystem(this.motionController);
    }

    update(deltaTime: number) {
        this.updateInfo();
        this.speedUpSystem.update(deltaTime);
    }

    private updateInfo(): void {
        if (!this.motionController.isBraking && !this.motionController.isPedalling) {
            this.bike.stateController.state = new BikeIdleState(this.bike, this.motionController);
        } else if (this.motionController.isBraking) {
            this.bike.stateController.state = new BikeBrakingState(this.bike, this.motionController);
        } else {
            this.speedUpSystem.setGear(this.motionController.gear);
        }
    }
}