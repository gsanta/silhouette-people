import { InjectProperty } from "../../di/diDecorators";
import { KeyboardService } from "../../services/input/KeyboardService";
import { lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { BikeMovingState } from "./BikeMovingState";

export class BikeIdleState extends AbstractMeshObjState {
    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.BikeIdleState, gameObject);
        this.keyboardService = lookup.keyboard;
    }

    keyboard(e: KeyboardEvent) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }
    
        if (
            this.keyboardService.checker.isMoveForward() ||
            this.keyboardService.checker.isMoveBackward() ||
            this.keyboardService.checker.isTurnLeft() ||
            this.keyboardService.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new BikeMovingState(this.gameObject));
        }
    }
}