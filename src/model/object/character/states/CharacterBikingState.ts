import { CharacterObj } from "../CharacterObj";
import { MeshState } from "../../mesh/MeshState";

export class CharacterBikingState extends MeshState {
    constructor(player: CharacterObj) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}