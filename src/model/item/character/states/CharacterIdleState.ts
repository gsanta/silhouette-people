import { CharacterItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterWalkingState } from "./CharacterWalkingState";

export class CharacterIdleState extends MeshState {

    constructor(character: CharacterItem) {
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
        const { characterController: walker } = this.character;

        if (!walker) { return; }

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.animationState = new CharacterWalkingState(this.character); 
        }
    }
}
