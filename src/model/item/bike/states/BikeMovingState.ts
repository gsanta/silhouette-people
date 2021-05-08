
import { InjectProperty } from "../../../../di/diDecorators";
import { lookup } from "../../../../service/Lookup";
import { WorldProvider } from "../../../../service/object/world/WorldProvider";
import { CharacterItem } from "../../character/CharacterItem";
import { MeshState } from "../../mesh/MeshState";

export class BikeMovingState extends MeshState {

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor(bike: CharacterItem) {
        super(bike);

        this.worldProvider = lookup.worldProvider;
    }
    
    update(): void {
        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.character.walker.walk(deltaTime);
    }

    enterState() {
        this.character.animation.runAnimation('Go');
    }
}