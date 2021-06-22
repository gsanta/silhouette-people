import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshStore } from "../../store/MeshStore";
import { KeyboardService } from "../input/KeyboardService";
import { ISetup } from "../setup/ISetup";
import { WorldProvider } from "../WorldProvider";
import { TransformTool } from "./TransformTool";

export class EditorSetup implements ISetup {

    private readonly worldProvider: WorldProvider;
    private readonly gameObjectStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly meshStore: MeshStore;
    private transformTool: TransformTool;

    constructor(worldProvider: WorldProvider, gameObjectStore: GameObjectStore, meshStore: MeshStore, keyboardService: KeyboardService) {
        this.worldProvider = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
    }

    async setup(): Promise<void> {
        if (!this.transformTool) {
            this.transformTool = new TransformTool(this.worldProvider, this.gameObjectStore, this.meshStore, this.keyboardService);
            this.transformTool.updateAttachableMeshes();
        }
    }
}