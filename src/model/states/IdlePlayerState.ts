import { GameObj } from "../objs/GameObj";
import { World } from "../../services/World";
import { AbstractGameObjState, GameObjectStateType } from "./AbstractGameObjState";
import { MovingCharacterState } from "./MovingCharacterState";

export class IdlePlayerState extends AbstractGameObjState {
    private world: World;

    constructor(gameObject: GameObj, world: World) {
        super(GameObjectStateType.Idle, gameObject);
        this.world = world;
    }

    updateInput() {
        if (!this.gameObject.tag.isPlayer()) { return undefined; }

        const keyboard = this.world.keyboard;

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