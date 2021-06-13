import { InjectProperty } from "../../../../di/diDecorators";
import { lookup } from "../../../../service/Lookup";
import { WorldProvider } from "../../../../service/WorldProvider";
import { CharacterItem } from "../CharacterItem";
import { MeshState } from "../../mesh/MeshState";
import { CharacterIdleState } from "./CharacterIdleState";

export class CharacterWalkingState extends MeshState {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(character: CharacterItem) {
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
        const { characterController: walker } = this.character;
        if (walker.getRotation() === 0 && walker.getSpeed() === 0) {
            this.character.stateController.state = new CharacterIdleState(this.character);
            return true;
        }

        return false;
    }
}
