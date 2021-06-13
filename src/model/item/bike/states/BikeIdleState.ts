import { CharacterController } from "../../mesh/CharacterController";
import { MeshItem } from "../../mesh/MeshItem";
import { MeshState } from "../../mesh/MeshState";
import { BikeStateInfo } from "../BikeState";
import { RollingSystem } from "../physics/RollingSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeSpeedUpState } from "./BikeSpeedupState";

export class BikeIdleState extends MeshState {
    private readonly bike: MeshItem;
    private readonly mover: CharacterController;
    private readonly rollingSystem: RollingSystem;

    constructor(bike: MeshItem, mover: CharacterController) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.rollingSystem = new RollingSystem(this.bike.characterController, 1)
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