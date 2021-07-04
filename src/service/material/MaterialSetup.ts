import { Color3, StandardMaterial, Texture } from "babylonjs";
import { TerrainMaterial } from "babylonjs-materials";
import { MaterialName, MaterialStore } from "../../store/MaterialStore";
import { ISetup } from "../setup/ISetup";
import { SceneService } from "../SceneService";
import { EdgeColor } from "../graph/GraphEdge";

export class MaterialSetup implements ISetup {
    private readonly materialStore: MaterialStore;
    private readonly sceneService: SceneService;

    constructor(sceneService: SceneService, materialStore: MaterialStore) {
        this.materialStore = materialStore;
        this.sceneService = sceneService;
    }


    async setup(): Promise<void> {
        this.setupRouteMaterials();
        const terrainMaterial = new TerrainMaterial(MaterialName.TERRAIN_1, this.sceneService.scene);

        terrainMaterial.mixTexture = new Texture("https://playground.babylonjs.com/textures/mixMap.png", this.sceneService.scene);        
        terrainMaterial.diffuseTexture1 = new Texture("https://playground.babylonjs.com/textures/floor.png", this.sceneService.scene);
        terrainMaterial.diffuseTexture2 = new Texture("https://playground.babylonjs.com/textures/rock.png", this.sceneService.scene);
        terrainMaterial.diffuseTexture3 = new Texture("https://playground.babylonjs.com/textures/grass.png", this.sceneService.scene);

        this.materialStore.addMaterial(MaterialName.TERRAIN_1, terrainMaterial);
    }

    private setupRouteMaterials() {
        const edgeColor1Material = new StandardMaterial(EdgeColor.GREEN, this.sceneService.scene);
        edgeColor1Material.diffuseColor = Color3.Green();
        edgeColor1Material.alpha = 0.5;
        this.materialStore.addMaterial(EdgeColor.GREEN, edgeColor1Material);

        let name = `${EdgeColor.GREEN}-highlight`;
        const edgeColor1HighlightMaterial = new StandardMaterial(name, this.sceneService.scene);
        edgeColor1HighlightMaterial.diffuseColor = Color3.Green();
        edgeColor1HighlightMaterial.alpha = 1;
        this.materialStore.addMaterial(name, edgeColor1HighlightMaterial);

        const edgeColor2Material = new StandardMaterial(EdgeColor.RED, this.sceneService.scene);
        edgeColor2Material.diffuseColor = Color3.Red();
        edgeColor2Material.alpha = 0.5;
        this.materialStore.addMaterial(EdgeColor.RED, edgeColor2Material);

        name = `${EdgeColor.RED}-highlight`;
        const edgeColor2HighlightMaterial = new StandardMaterial(name, this.sceneService.scene);
        edgeColor2HighlightMaterial.diffuseColor = Color3.Red();
        edgeColor2HighlightMaterial.alpha = 1;
        this.materialStore.addMaterial(name, edgeColor2HighlightMaterial);

        const edgeColor3Material = new StandardMaterial(EdgeColor.GRAY, this.sceneService.scene);
        edgeColor3Material.diffuseColor = Color3.Gray();
        edgeColor3Material.alpha = 0.5;
        this.materialStore.addMaterial(EdgeColor.GRAY, edgeColor3Material);

        name = `${EdgeColor.GRAY}-highlight`;
        const edgeColor3HighlightMaterial = new StandardMaterial(name, this.sceneService.scene);
        edgeColor3HighlightMaterial.diffuseColor = Color3.Gray();
        edgeColor3HighlightMaterial.alpha = 1;
        this.materialStore.addMaterial(name, edgeColor3HighlightMaterial);
    }
}