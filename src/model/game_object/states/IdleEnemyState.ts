import { AbstractCharacterState, GameObjectStateType } from "./AbstractCharacterState";
import { GameObject } from "../GameObject";

export class IdleEnemyState extends AbstractCharacterState {

    constructor(gameObject: GameObject) {
        super(GameObjectStateType.EnemyIdle, gameObject);
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