import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { RollingSystem } from "../physics/RollingSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeSpeedUpState } from "./BikeSpeedUpState";
import { BikeController } from "../BikeController";

export class BikeIdleState extends GameObjectState {
    private readonly bike: GameObject;
    private readonly motionController: BikeController;
    private readonly rollingSystem: RollingSystem;

    constructor(bike: GameObject, motionController: BikeController) {
        super(bike);
        this.bike = bike;
        this.motionController = motionController;
        this.rollingSystem = new RollingSystem(this.bike.motionController, 1)
    }
    
    update(deltaTime: number) {
        this.updateInfo();
        this.rollingSystem.update(deltaTime);
    }

    private updateInfo(): void {
        if (this.motionController.isBraking) {
            this.bike.stateController.state = new BikeBrakingState(this.bike, this.motionController);
        } else if (this.motionController.isPedalling) {
            this.bike.stateController.state = new BikeSpeedUpState(this.bike, this.motionController);
        }
    }
}