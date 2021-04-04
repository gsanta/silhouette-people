import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";
import { GameObj } from "../objs/GameObj";

export class EnemyIdleState extends AbstractGameObjState {

    constructor(gameObject: GameObj) {
        super(GameObjStateName.EnemyIdleState, gameObject);
    }

    enter() {
        this.gameObject.runAnimation('Idle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}