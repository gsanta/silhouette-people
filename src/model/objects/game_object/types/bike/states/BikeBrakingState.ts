import { lookup } from "../../../../../../service/DependencyResolver";
import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { BikeController } from "../BikeController";
import { BrakingSystem } from "../physics/BrakingSystem";
import { BikeIdleState } from "./BikeIdleState";
import { BikeSpeedUpState } from "./BikeSpeedUpState";

export class BikeBrakingState extends GameObjectState {
    private readonly bike: GameObject;
    private readonly motionController: BikeController;
    private readonly brakeSystem: BrakingSystem;
    private powerBrake = false;

    constructor(bike: GameObject, motionController: BikeController) {
        super(bike);
        this.bike = bike;
        this.motionController = motionController;
        this.brakeSystem = new BrakingSystem(lookup.sceneService, bike, this.motionController, 1.5);
    }

    update(deltaTime: number) {
        this.updateInfo();
        this.brakeSystem.break(deltaTime, this.powerBrake);
    }

    private updateInfo(): void {
        this.powerBrake = this.motionController.isPowerBrakeOn;
        if (!this.motionController.isBraking) {
            if (this.motionController.isPedalling) {
                this.bike.stateController.state = new BikeSpeedUpState(this.bike, this.motionController);
            } else {
                this.bike.stateController.state = new BikeIdleState(this.bike, this.motionController);
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