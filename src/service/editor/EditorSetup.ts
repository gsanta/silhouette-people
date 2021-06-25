import { GameObjectStore } from "../../store/GameObjectStore";
import { MeshStore } from "../../store/MeshStore";
import { EventService } from "../EventService";
import { KeyboardService } from "../input/KeyboardService";
import { SceneService } from "../SceneService";
import { ISetup } from "../setup/ISetup";
import { ToolType } from "./controllers/TransformController";
import { EditorService } from "./EditorService";
import { GizmoManagerAdapter } from "./tools/GizmoManagerAdapter";
import { TransformTool } from "./tools/TransformTool";

export class EditorSetup implements ISetup {

    private readonly sceneService: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly meshStore: MeshStore;
    private readonly editorService: EditorService;
    private readonly eventService: EventService;


    private gizmoManagerAdapter: GizmoManagerAdapter;

    constructor(
        worldProvider: SceneService,
        gameObjectStore: GameObjectStore,
        meshStore: MeshStore,
        keyboardService: KeyboardService,
        editorService: EditorService,
        eventService: EventService
    ) {
        this.sceneService = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
        this.editorService = editorService;
        this.eventService = eventService;
    }

    async setup(): Promise<void> {
        this.gizmoManagerAdapter = new GizmoManagerAdapter(this.sceneService, this.gameObjectStore, this.meshStore, this.eventService);

        this.editorService.toolController.addTool(new TransformTool(this.gizmoManagerAdapter, ToolType.TRANSFORM));
        this.editorService.toolController.addTool(new TransformTool(this.gizmoManagerAdapter, ToolType.ROTATE));

        this.editorService.isEditorOpen = true;
    }
}