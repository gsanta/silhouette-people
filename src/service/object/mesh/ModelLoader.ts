import { SceneLoader } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { AssetContainerStore } from "../../../store/AssetContainerStore";
import { lookup } from "../../DependencyResolver";
import { SceneService } from "../../SceneService";

export class ModelLoader {

    @InjectProperty('AssetContainerStore')
    private assetContainerStore: AssetContainerStore;

    @InjectProperty('WorldProvider')
    private worldProvider: SceneService;

    constructor() {
        this.assetContainerStore = lookup.assetContainerStore;
        this.worldProvider = lookup.sceneService;
    }

    async loadModel(type: string, relativePath: string) {
        const container = await SceneLoader.LoadAssetContainerAsync("assets/models/", relativePath, this.worldProvider.scene);
        this.assetContainerStore.addInstance(type, container);
    }
}