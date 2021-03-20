import { AbstractCharacterState, GameObjectStateType } from "./AbstractCharacterState";
import { GameObj } from "../objs/GameObj";

export class IdleEnemyState extends AbstractCharacterState {

    constructor(gameObject: GameObj) {
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