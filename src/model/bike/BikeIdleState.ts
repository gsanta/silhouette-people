import { InjectProperty } from "../../di/diDecorators";
import { KeyboardService } from "../../services/input/KeyboardService";
import { lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "../states/AbstractMeshState";
import { BikeMovingState } from "./BikeMovingState";
import { BikeState } from "./BikeState";

export class BikeIdleState extends BikeState {
    // @InjectProperty("KeyboardService")
    // private keyboardService: KeyboardService;

    // constructor(gameObject: MeshObj) {
    //     super(MeshStateName.BikeIdleState, gameObject);
    //     this.keyboardService = lookup.keyboard;
    // }

    // keyboard(e: KeyboardEvent) {
    //     if (!this.gameObject.tag.isPlayer()) { return undefined; }
    
    //     if (
    //         this.keyboardService.checker.isMoveForward() ||
    //         this.keyboardService.checker.isMoveBackward() ||
    //         this.keyboardService.checker.isTurnLeft() ||
    //         this.keyboardService.checker.isTurnRight()
    //     ) {
    //         this.gameObject.state.setState(new BikeMovingState(this.gameObject));
    //     }
    // }

    setPedalling(isPedalling: boolean) {
        super.setPedalling(isPedalling);

        return isPedalling ? this.copyTo(new BikeMovingState(this.bike)) : this;
    }
}