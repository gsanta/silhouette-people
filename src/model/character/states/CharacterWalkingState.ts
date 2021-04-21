import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { WorldProvider } from "../../../services/WorldProvider";
import { CharacterObj } from "../../general/objs/CharacterObj";
import { MeshState } from "../../general/state/MeshState";
import { CharacterIdleState } from "./CharacterIdleState";

export class CharacterWalkingState extends MeshState {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(character: CharacterObj) {
        super(character);
        this.worldProvider = lookup.worldProvider;
        this.enterState();
    }

    update(): void {
        this.changeStateIfNeeded();
    }

    enterState() {
        this.character.animation.runAnimation('Walk');
    }

    private changeStateIfNeeded() {
        const { walker } = this.character;
        if (walker.getRotation() === 0 && walker.getSpeed() === 0) {
            this.character.animationState = new CharacterIdleState(this.character);
            return true;
        }

        return false;
    }
}
