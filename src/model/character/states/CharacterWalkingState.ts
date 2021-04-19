import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { WorldProvider } from "../../../services/WorldProvider";
import { Character } from "../../general/objs/MeshObj";
import { CharacterIdleState } from "./CharacterIdleState";
import { CharacterState } from "./CharacterState";

export class CharacterWalkingState extends CharacterState {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(player: Character) {
        super(player);
        this.worldProvider = lookup.worldProvider;
        this.enterState();
    }

    beforeRender(): void {
        if (!this.changeStateIfNeeded()) {
            const deltaTime = this.worldProvider.world.engine.getDeltaTime();
            this.meshObj.walker.walk(deltaTime);
        }
    }

    enterState() {
        this.meshObj.animation.runAnimation('Walk');
    }

    private changeStateIfNeeded() {
        const { walker } = this.meshObj;
        if (walker.getRotation() === 0 && walker.getSpeed() === 0) {
            this.meshObj.state = new CharacterIdleState(this.meshObj);
            return true;
        }

        return false;
    }
}
