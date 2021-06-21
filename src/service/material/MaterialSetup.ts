import { Texture } from "babylonjs";
import { TerrainMaterial } from "babylonjs-materials";
import { MaterialStore } from "../../store/MaterialStore";
import { ISetup } from "../setup/ISetup";
import { WorldProvider } from "../WorldProvider";

export class MaterialSetup implements ISetup {
    private readonly materialStore: MaterialStore;
    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.materialStore = materialStore;
        this.worldProvider = worldProvider;
    }


    async setup(): Promise<void> {
        const terrainMaterial = new TerrainMaterial("material-terrain-1", this.worldProvider.scene);

        terrainMaterial.mixTexture = new Texture("https://playground.babylonjs.com/textures/mixMap.png", this.worldProvider.scene);        
        terrainMaterial.diffuseTexture1 = new Texture("https://playground.babylonjs.com/textures/floor.png", this.worldProvider.scene);
        terrainMaterial.diffuseTexture2 = new Texture("https://playground.babylonjs.com/textures/rock.png", this.worldProvider.scene);
        terrainMaterial.diffuseTexture3 = new Texture("https://playground.babylonjs.com/textures/grass.png", this.worldProvider.scene);

        this.materialStore.addMaterial('material-terrain-1', terrainMaterial);
    }
}