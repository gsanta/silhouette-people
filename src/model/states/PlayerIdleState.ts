import { InjectProperty } from "../../di/diDecorators";
import { KeyboardService } from "../../services/input/KeyboardService";
import { lookup } from "../../services/Lookup";
import { MeshObj } from "../objs/MeshObj";
import { AbstractMeshState, MeshStateName } from "./AbstractMeshState";
import { PlayerMovingState } from "./PlayerMovingState";

export class PlayerIdleState extends AbstractMeshState {
    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    constructor(gameObject: MeshObj) {
        super(MeshStateName.PlayerIdleState, gameObject);
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

    enterState() {
        this.gameObject.runAnimation('Idle');
    }

    exitState() {
        this.gameObject.stopCurrentAnimation();
    }
}