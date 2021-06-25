import { Axis, Color3, Color4, MeshBuilder, Space, StandardMaterial, Vector2, Vector3 } from "babylonjs";
import { QuarterItem } from "../../model/objects/game_object/types/quarter/QuarterItem";
import { MaterialStore } from "../../store/MaterialStore";
import { QuarterStore } from "../../store/QuarterStore";
import { SceneService } from "../SceneService";

export interface QuarterObjConfig {
    color: string;
    position: Vector2;
    size: Vector2;
    materialId: string;
}

export class QuarterFactory {
    private readonly quarterStore: QuarterStore;
    private readonly worldProvider: SceneService;
    private readonly materialStore: MaterialStore;

    constructor(worldProvider: SceneService, quarterStore: QuarterStore, materialStore: MaterialStore) {
        this.quarterStore = quarterStore;
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    createQuarter(config: QuarterObjConfig): void {
        const { position, color, size } = config;

        const id = `ground-${position.x}-${position.y}`;
        const ground = MeshBuilder.CreateGround(id, { width: size.x, height: size.y });
        ground.enableEdgesRendering();
        ground.edgesWidth = 5.0;
        ground.edgesColor = new Color4(0, 0, 1, 1);
        

        if (config.materialId) {
            ground.material = this.materialStore.getMaterialById(config.materialId);
        } else {
            const material = new StandardMaterial(`${id}-material`, this.worldProvider.scene);
            material.diffuseColor = Color3.FromHexString(color);
            material.specularColor = new Color3(0, 0, 0);
            ground.material = material;
        }

        const translateX = position.x * size.x + size.x / 2;
        const translateY = position.y * size.y - size.y / 2;

        ground.translate(new Vector3(translateX, 0, translateY), 1, Space.WORLD);
        ground.parent = this.worldProvider.world.ground;
        ground.translate(Axis.Y, 0.2, Space.WORLD);

        const quarter = new QuarterItem(id, ground);
        
        this.quarterStore.addQuarter(quarter);
    }
}