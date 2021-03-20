import { GameObj } from "../objs/GameObj";
import { World } from "../World";
import { AbstractCharacterState, GameObjectStateType } from "./AbstractCharacterState";
import { MovingCharacterState } from "./MovingCharacterState";

export class IdleCharacterState extends AbstractCharacterState {
    private world: World;

    constructor(gameObject: GameObj, world: World) {
        super(GameObjectStateType.Idle, gameObject);
        this.world = world;
    }

    updateInput() {
        const keyboard = this.world.keyboard;
        const activeCommands = keyboard.checker.getActiveCommands();

        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            return new MovingCharacterState(this.gameObject, this.world);
        }
    }

    updateAnimation() {
        this.gameObject.runAnimation('Idle');
    }

    updatePhysics() {
        return undefined;
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}