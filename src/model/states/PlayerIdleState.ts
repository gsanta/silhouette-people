import { MeshObj } from "../objs/MeshObj";
import { Lookup } from "../../services/Lookup";
import { AbstractMeshObjState, MeshObjStateName } from "./AbstractMeshObjState";
import { PlayerMovingState } from "./PlayerMovingState";

export class PlayerIdleState extends AbstractMeshObjState {
    private lookup: Lookup;

    constructor(gameObject: MeshObj, lookup: Lookup) {
        super(MeshObjStateName.PlayerIdleState, gameObject);
        this.lookup = lookup;
    }

    keyboard(e: KeyboardEvent) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }
        if (!this.gameObject.player.isActive()) { return undefined; }

        const keyboard = this.lookup.keyboard;

        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new PlayerMovingState(this.gameObject, this.lookup));
        }
    }

    enter() {
        this.gameObject.runAnimation('Idle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}