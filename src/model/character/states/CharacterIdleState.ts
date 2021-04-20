import { CharacterObj } from "../../general/objs/CharacterObj";
import { MeshState } from "../../general/state/MeshState";
import { CharacterWalkingState } from "./CharacterWalkingState";

export class CharacterIdleState extends MeshState {

    constructor(character: CharacterObj) {
        super(character);
        this.enterState();
    }

    beforeRender() {
        this.changeStateIfNeeded();
    }

    enterState() {
        this.character.animation.runAnimation('Idle');
    }

    private changeStateIfNeeded() {
        const { walker } = this.character;

        if (!walker) { return; }

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.state = new CharacterWalkingState(this.character); 
        }
    }
}
