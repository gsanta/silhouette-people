import { Axis, Color3, Color4, MeshBuilder, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { QuarterObj } from "../../../model/object/quarter/QuarterObj";
import { QuarterStore } from "../../../store/QuarterStore";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../world/WorldProvider";

export interface QuarterObjConfig {
    color: string;
    position: Vector2;
    size: Vector2;
}

export class QuarterFactory {
    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.quarterStore = lookup.quarterStore;
        this.worldProvider = lookup.worldProvider;
    }

    createQuarter(config: QuarterObjConfig): void {
        const { position, color, size } = config;

        const id = `ground-${position.x}-${position.y}`;
        const ground = MeshBuilder.CreateGround(id, { width: size.x, height: size.y });
        ground.enableEdgesRendering();
        ground.edgesWidth = 5.0;
        ground.edgesColor = new Color4(0, 0, 1, 1);
        
        const material = new StandardMaterial(`${id}-material`, this.worldProvider.world.scene);
        material.diffuseColor = Color3.FromHexString(color);
        material.specularColor = new Color3(0, 0, 0);
        ground.material = material;
        

        const translateX = position.x * size.x + size.x / 2;
        const translateY = position.y * size.y - size.y / 2;

        ground.translate(new Vector3(translateX, 0, translateY), 1, Space.WORLD);
        ground.parent = this.worldProvider.world.ground;
        ground.translate(Axis.Y, 0.2, Space.WORLD);

        const quarter = new QuarterObj(id, ground);
        
        this.quarterStore.addQuarter(quarter);
    }
}