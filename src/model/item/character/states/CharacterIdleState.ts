import { GameObject } from "../../../objects/game_object/GameObject";
import { MeshState } from "../../mesh/MeshState";
import { CharacterWalkingState } from "./CharacterWalkingState";

export class CharacterIdleState extends MeshState {

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
        const { characterController: walker } = this.character;

        if (!walker) { return; }

        if (walker.getRotation() !== 0 || walker.getSpeed() !== 0) {
            this.character.stateController.state = new CharacterWalkingState(this.character); 
        }
    }
}
