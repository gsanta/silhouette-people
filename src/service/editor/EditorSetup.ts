import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshStore } from "../../store/MeshStore";
import { KeyboardService } from "../input/KeyboardService";
import { MeshFactory } from "../object/mesh/MeshFactory";
import { RenderGuiService } from "../RenderGuiService";
import { ISetup } from "../setup/ISetup";
import { WorldProvider } from "../WorldProvider";
import { MeshLoaderController } from "./controllers/MeshLoaderController";
import { EditorService } from "./EditorService";
import { TransformTool } from "./TransformTool";

export class EditorSetup implements ISetup {

    private readonly worldProvider: WorldProvider;
    private readonly gameObjectStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly meshStore: MeshStore;
    private readonly renderGuiService: RenderGuiService;
    private readonly editorService: EditorService;
    private readonly meshFactory: MeshFactory;
    private transformTool: TransformTool;

    constructor(
        worldProvider: WorldProvider,
        gameObjectStore: GameObjectStore,
        meshStore: MeshStore,
        keyboardService: KeyboardService,
        renderGuiService: RenderGuiService,
        editorService: EditorService,
        meshFactory: MeshFactory
    ) {
        this.worldProvider = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
        this.renderGuiService = renderGuiService;
        this.editorService = editorService;
        this.meshFactory = meshFactory;
    }

    async setup(): Promise<void> {
        if (!this.transformTool) {
            this.transformTool = new TransformTool(this.worldProvider, this.gameObjectStore, this.meshStore, this.keyboardService);
            this.transformTool.updateAttachableMeshes();
        }

        this.editorService.meshLoaderController = new MeshLoaderController(this.keyboardService, this.renderGuiService, this.meshFactory);

        this.editorService.isEditorOpen = true;
    }
}