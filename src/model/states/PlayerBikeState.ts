import { Character } from "../objs/MeshObj";
import { PlayerState } from "./PlayerState";

export class PlayerBikeState extends PlayerState {
    constructor(player: Character) {
        super(player);
    }

    enterState() {
        this.player.runAnimation('Bicycle');
    }
}