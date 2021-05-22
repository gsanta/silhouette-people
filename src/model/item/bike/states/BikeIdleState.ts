import { BikeItem } from "../../character/CharacterItem";
import { BikeState, BikeStateInfo } from "../BikeState";
import { RollingSystem } from "../physics/RollingSystem";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeSpeedUpState } from "./BikeSpeedupState";
import { BikeMover } from "./BikeMover";
import { MeshMover } from "../../mesh/MeshMover";

export class BikeIdleState extends BikeState {
    private readonly bike: BikeItem;
    private readonly mover: MeshMover;
    private readonly rollingSystem: RollingSystem;

    constructor(bike: BikeItem, mover: MeshMover) {
        super(bike);
        this.bike = bike;
        this.mover = mover;
        this.rollingSystem = new RollingSystem(this.bike.mover, 1)
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (bikeStateInfo.isBreaking) {
            this.bike.setState(new BikeBrakingState(this.bike, this.mover));
        } else if (bikeStateInfo.isPedalling) {
            this.bike.setState(new BikeSpeedUpState(this.bike, this.mover));
        }
    }
    
    update(deltaTime: number) {
        this.rollingSystem.update(deltaTime);
    }

    // private changeStateIfNeeded() {
    //     const { walker } = this.character;

    //     if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
    //         this.character.animationState = new BikeMovingState(this.character); 
    //     }
    // }
}