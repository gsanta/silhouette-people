import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshStore } from "../../store/MeshStore";
import { CameraService } from "../camera/CameraService";
import { KeyboardService } from "../input/KeyboardService";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { RenderGuiService } from "../RenderGuiService";
import { ISetup } from "../setup/ISetup";
import { SceneService } from "../SceneService";
import { MeshLoaderController } from "./controllers/MeshLoaderController";
import { EditorService } from "./EditorService";
import { TransformTool } from "./TransformTool";

export class EditorSetup implements ISetup {

    private readonly worldProvider: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly meshStore: MeshStore;
    private readonly editorService: EditorService;
    private transformTool: TransformTool;

    constructor(
        worldProvider: SceneService,
        gameObjectStore: GameObjectStore,
        meshStore: MeshStore,
        keyboardService: KeyboardService,
        editorService: EditorService,
    ) {
        this.worldProvider = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
        this.editorService = editorService;
    }

    async setup(): Promise<void> {
        if (!this.transformTool) {
            this.transformTool = new TransformTool(this.worldProvider, this.gameObjectStore, this.meshStore, this.keyboardService);
            this.transformTool.updateAttachableMeshes();
        }

        this.editorService.isEditorOpen = true;
    }
}