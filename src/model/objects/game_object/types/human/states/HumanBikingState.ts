import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";

export class HumanBikingState extends GameObjectState {
    constructor(player: GameObject) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}