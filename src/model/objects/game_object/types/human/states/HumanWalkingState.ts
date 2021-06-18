import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { HumanIdleState } from "./HumanIdleState";

export class HumanWalkingState extends GameObjectState {

    constructor(character: GameObject) {
        super(character);
        this.enterState();
    }

    update(): void {
        this.changeStateIfNeeded();
    }

    enterState() {
        this.character.animation.runAnimation('Walk');
    }

    private changeStateIfNeeded() {
        const { motionController: walker } = this.character;
        if (walker.getRotation() === 0 && walker.getSpeed() === 0) {
            this.character.stateController.state = new HumanIdleState(this.character);
            return true;
        }

        return false;
    }
}
