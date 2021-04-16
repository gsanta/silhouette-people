import { Character } from "../objs/MeshObj";
import { CharacterState } from "./CharacterState";

export class CharacterBikingState extends CharacterState {
    constructor(player: Character) {
        super(player);
        this.enterState();
    }

    enterState() {
        this.meshObj.runAnimation('Bicycle');
    }
}