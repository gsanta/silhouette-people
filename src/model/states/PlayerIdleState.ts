import { GameObj } from "../objs/GameObj";
import { Lookup } from "../../services/Lookup";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { PlayerMovingState } from "./PlayerMovingState";

export class PlayerIdleState extends AbstractGameObjState {
    private world: Lookup;

    constructor(gameObject: GameObj, world: Lookup) {
        super(GameObjStateName.PlayerIdleState, gameObject);
        this.world = world;
    }

    keyboard(e: KeyboardEvent) {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }

        const keyboard = this.world.keyboard;

        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            this.gameObject.state.setState(new PlayerMovingState(this.gameObject, this.world));
        }
    }

    enter() {
        this.gameObject.runAnimation('Idle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}