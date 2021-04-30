import { SceneLoader } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { AssetContainerStore } from "../../stores/AssetContainerStore";
import { lookup } from "../Lookup";
import { WorldProvider } from "../WorldProvider";

export class ModelLoader {

    @InjectProperty('AssetContainerStore')
    private assetContainerStore: AssetContainerStore;

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    constructor() {
        this.assetContainerStore = lookup.assetContainerStore;
        this.worldProvider = lookup.worldProvider;
    }

    async loadModel(type: string, relativePath: string) {
        const container = await SceneLoader.LoadAssetContainerAsync("assets/models/", relativePath, this.worldProvider.world.scene);
        this.assetContainerStore.addInstance(type, container);
    }
}