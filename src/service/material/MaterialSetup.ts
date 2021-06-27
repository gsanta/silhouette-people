import { Texture } from "babylonjs";
import { TerrainMaterial } from "babylonjs-materials";
import { MaterialName, MaterialStore } from "../../store/MaterialStore";
import { ISetup } from "../setup/ISetup";
import { SceneService } from "../SceneService";

export class MaterialSetup implements ISetup {
    private readonly materialStore: MaterialStore;
    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.materialStore = materialStore;
        this.worldProvider = worldProvider;
    }


    async setup(): Promise<void> {
        const terrainMaterial = new TerrainMaterial(MaterialName.TERRAIN_1, this.worldProvider.scene);

        terrainMaterial.mixTexture = new Texture("https://playground.babylonjs.com/textures/mixMap.png", this.worldProvider.scene);        
        terrainMaterial.diffuseTexture1 = new Texture("https://playground.babylonjs.com/textures/floor.png", this.worldProvider.scene);
        terrainMaterial.diffuseTexture2 = new Texture("https://playground.babylonjs.com/textures/rock.png", this.worldProvider.scene);
        terrainMaterial.diffuseTexture3 = new Texture("https://playground.babylonjs.com/textures/grass.png", this.worldProvider.scene);

        this.materialStore.addMaterial(MaterialName.TERRAIN_1, terrainMaterial);
    }
}