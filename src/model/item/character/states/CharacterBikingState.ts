import { CharacterItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";

export class CharacterBikingState extends MeshState {
    constructor(player: CharacterItem) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}