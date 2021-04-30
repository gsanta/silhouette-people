import { InjectProperty } from "../../../../di/diDecorators";
import { lookup } from "../../../../service/Lookup";
import { WorldProvider } from "../../../../service/object/world/WorldProvider";
import { CharacterObj } from "../CharacterObj";
import { MeshState } from "../../mesh/MeshState";
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
