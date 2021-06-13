import { GameObject } from "../../../objects/game_object/GameObject";
import { MeshState } from "../../mesh/MeshState";
import { CharacterIdleState } from "./CharacterIdleState";

export class CharacterWalkingState extends MeshState {

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
        const { characterController: walker } = this.character;
        if (walker.getRotation() === 0 && walker.getSpeed() === 0) {
            this.character.stateController.state = new CharacterIdleState(this.character);
            return true;
        }

        return false;
    }
}
