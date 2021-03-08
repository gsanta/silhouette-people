import { AbstractCharacterState } from "../../model/character/AbstractCharacterState";
import { MovingCharacterState } from "../../model/character/MovingCharacterState";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";

export class IdleEnemyState extends AbstractCharacterState {
    updateAnimation(gameObject: GameObject) {
        gameObject.runAnimation('Idle');
    }

    updatePhysics(gameObject: GameObject, world: World) {
        return undefined;
    }

    exit(gameObject: GameObject) {
        gameObject.stopCurrentAnimation();
    }
}