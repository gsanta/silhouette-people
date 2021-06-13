import { GameObject } from "../../../objects/game_object/GameObject";
import { MeshState } from "../../mesh/MeshState";

export class CharacterBikingState extends MeshState {
    constructor(player: GameObject) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.character.animation.runAnimation('Bicycle');
    }
}