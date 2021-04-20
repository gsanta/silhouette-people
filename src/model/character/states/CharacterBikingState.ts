import { CharacterObj } from "../../general/objs/CharacterObj";
import { MeshState } from "../../general/state/MeshState";

export class CharacterBikingState extends MeshState {
    constructor(player: CharacterObj) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}