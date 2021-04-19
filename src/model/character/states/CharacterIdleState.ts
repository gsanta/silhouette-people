import { CharacterWalkingState } from "./CharacterWalkingState";
import { CharacterState } from "./CharacterState";
import { Character } from "../../general/objs/MeshObj";

export class CharacterIdleState extends CharacterState {

    constructor(player: Character) {
        super(player);
        this.enterState();
    }

    beforeRender() {
        this.changeStateIfNeeded();
    }

    enterState() {
        this.meshObj.animation.runAnimation('Idle');
    }

    private changeStateIfNeeded() {
        const { walker } = this.meshObj;

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.meshObj.state = new CharacterWalkingState(this.meshObj); 
        }
    }
}
