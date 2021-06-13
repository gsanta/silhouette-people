import { MeshItem } from "../../mesh/MeshItem";
import { MeshState } from "../../mesh/MeshState";

export class CharacterBikingState extends MeshState {
    constructor(player: MeshItem) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}