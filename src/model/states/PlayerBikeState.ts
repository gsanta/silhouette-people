import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";

export class PlayerBikeState extends AbstractGameObjState {
    constructor(gameObject: GameObj) {
        super(GameObjStateName.PlayerBikeState, gameObject);
    }

    enter() {
        this.gameObject.runAnimation('Bicycle');
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}