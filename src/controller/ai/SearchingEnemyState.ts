import { AbstractCharacterState } from "../../model/character/AbstractCharacterState";
import { GameObject } from "../../model/GameObject";
import { World } from "../../model/World";

export class SearchingEnemyState extends AbstractCharacterState {
    updateAnimation(gameObject: GameObject) {
        gameObject.runAnimation('Walk');
    }

    updatePhysics(gameObject: GameObject, world: World) {
        return undefined;
    }

    exit(gameObject: GameObject) {
        gameObject.stopCurrentAnimation();
    }
}