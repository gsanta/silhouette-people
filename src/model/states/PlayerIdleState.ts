import { InjectProperty } from "../../di/diDecorators";
import { KeyboardService } from "../../services/input/KeyboardService";
import { lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { PlayerMovingState } from "./PlayerMovingState";

export class PlayerIdleState extends AbstractMeshObjState {
    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor(gameObject: MeshObj) {
        super(MeshObjStateName.PlayerIdleState, gameObject);
        this.keyboardService = lookup.keyboard;
    }

    keyboard(e: KeyboardEvent) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }
        if (!this.gameObject.player.isActive()) { return undefined; }

        if (
            this.keyboardService.checker.isMoveForward() ||
            this.keyboardService.checker.isMoveBackward() ||
            this.keyboardService.checker.isTurnLeft() ||
            this.keyboardService.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new PlayerMovingState(this.gameObject));
        }
    }

    enter() {
        this.gameObject.runAnimation('Idle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}