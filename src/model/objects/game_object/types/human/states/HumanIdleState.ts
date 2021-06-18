import { GameObject } from "../../../GameObject";
import { GameObjectState } from "../../../GameObjectState";
import { HumanWalkingState } from "./HumanWalkingState";

export class HumanIdleState extends GameObjectState {

    constructor(character: GameObject) {
        super(character);
        this.enterState();
    }

    update() {
        this.changeStateIfNeeded();
    }

    enterState() {
        this.character.animation.runAnimation('Idle');
    }

    private changeStateIfNeeded() {
        const { motionController: walker } = this.character;

        if (!walker) { return; }

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.stateController.state = new HumanWalkingState(this.character); 
        }
    }
}
