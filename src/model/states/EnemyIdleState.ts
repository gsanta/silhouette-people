import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { GameObj } from "../objs/GameObj";

export class EnemyIdleState extends AbstractGameObjState {

    constructor(gameObject: GameObj) {
        super(GameObjStateName.EnemyIdleState, gameObject);
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