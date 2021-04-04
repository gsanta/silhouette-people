import { GameObj } from "../objs/GameObj";
import { AbstractGameObjState, GameObjStateName } from "./AbstractGameObjState";

export class PlayerBikeState extends AbstractGameObjState {
    constructor(gameObject: GameObj) {
        super(GameObjStateName.PlayerBikeState, gameObject);
    }

    updateAnimation(): void {
        if (!this.gameObject.isAnimationRunning('Bicycle')) {
            this.gameObject.runAnimation('Bicycle');
        }
    }

    exit() {
        this.gameObject.stopCurrentAnimation();
    }
}