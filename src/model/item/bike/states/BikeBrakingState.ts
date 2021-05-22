import { lookup } from "../../../../service/Lookup";
import { BikeItem } from "../../character/CharacterItem";
import { BikeState, BikeStateInfo } from "../BikeState";
import { BikeBrakingPhysics } from "../physics/BikeBrakingPhysics";
import { BikeIdleState } from "./BikeIdleState";
import { BikeSpeedUpState } from "./BikeSpeedupState";


export class BikeBrakingState extends BikeState {
    private bike: BikeItem;
    private brakeSystem: BikeBrakingPhysics;

    constructor(bike: BikeItem) {
        super(bike);
        this.bike = bike;
        this.brakeSystem = new BikeBrakingPhysics(lookup.worldProvider, bike, this.bike.walker, 1.5);
    }

    updateInfo(bikeStateInfo: BikeStateInfo): void {
        if (!bikeStateInfo.isBreaking) {
            if (bikeStateInfo.isPedalling) {
                this.bike.setState(new BikeSpeedUpState(this.bike));
            } else {
                this.bike.setState(new BikeIdleState(this.bike));
            }
        }
    }

    update(deltaTime: number) {
        this.brakeSystem.update(deltaTime);
    }

    enterState() {
        this.brakeSystem.enter();
    }

    exitState() {
        this.brakeSystem.exit();
    }
}