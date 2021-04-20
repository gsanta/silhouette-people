
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../../services/Lookup";
import { WorldProvider } from "../../services/WorldProvider";
import { CharacterObj } from "../general/objs/CharacterObj";
import { MeshState } from "../general/state/MeshState";

export class BikeMovingState extends MeshState {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(bike: CharacterObj) {
        super(bike);

        this.worldProvider = lookup.worldProvider;
    }
    
    beforeRender(): void {
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.character.walker.walk(deltaTime);
    }

    enterState() {
        this.character.animation.runAnimation('Go');
    }
}