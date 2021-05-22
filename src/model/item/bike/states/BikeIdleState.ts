import { BikeItem } from "../../character/CharacterItem";
import { BikeState, BikeStateInfo } from "../BikeState";
import { BikeSlowdownPhysics } from "../physics/BikeSlowdownPhysics";
import { BikeBrakingState } from "./BikeBrakingState";
import { BikeSpeedUpState } from "./BikeSpeedupState";

export class BikeIdleState extends BikeState {
    private bike: BikeItem;
    private rollingSystem: BikeSlowdownPhysics;

    constructor(bike: BikeItem) {
        super(bike);
        this.bike = bike;
        this.rollingSystem = new BikeSlowdownPhysics(this.bike.walker, 1)
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (bikeStateInfo.isBreaking) {
            this.bike.setState(new BikeBrakingState(this.bike));
        } else if (bikeStateInfo.isPedalling) {
            this.bike.setState(new BikeSpeedUpState(this.bike));
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