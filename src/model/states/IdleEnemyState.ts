import { AbstractGameObjState, GameObjectStateType } from "./AbstractGameObjState";
import { GameObj } from "../objs/GameObj";

export class IdleEnemyState extends AbstractGameObjState {

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