import { GameObject } from "../GameObject";
import { World } from "../World";
import { AbstractCharacterState } from "./ICharacterState";
import { MovingCharacterState } from "./MovingCharacterState";



export class IdleCharacterState extends AbstractCharacterState {

    updateInput(gameObject: GameObject, world: World) {
        const keyboard = world.keyboard;
        const activeCommands = keyboard.checker.getActiveCommands();

        if (
            keyboard.checker.isMoveForward() ||
            keyboard.checker.isMoveBackward() ||
            keyboard.checker.isTurnLeft() ||
            keyboard.checker.isTurnRight()
        ) {
            return new MovingCharacterState();
        }
    }

    updatePhysics(gameObject: GameObject, world: World) {
        return undefined;
    }
}