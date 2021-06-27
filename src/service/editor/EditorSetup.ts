import { GameObjectStore } from "../../store/GameObjectStore";
import { MaterialStore } from "../../store/MaterialStore";
import { MeshStore } from "../../store/MeshStore";
import { EventService } from "../EventService";
import { GraphService } from "../graph/GraphService";
import { KeyboardService } from "../input/KeyboardService";
import { RenderGuiService } from "../RenderGuiService";
import { SceneService } from "../SceneService";
import { ISetup } from "../setup/ISetup";
import { ToolType } from "./controllers/TransformController";
import { EditorService } from "./EditorService";
import { EraseHotkey } from "./hotkeys/EraseHotkey";
import { GizmoManagerAdapter } from "./tools/GizmoManagerAdapter";
import { RouteCreateTool } from "./tools/RouteCreateTool";
import { RouteTool } from "./tools/RouteTool";
import { TransformTool } from "./tools/TransformTool";

export class EditorSetup implements ISetup {

    private readonly sceneService: SceneService;
    private readonly gameObjectStore: GameObjectStore;
    private readonly keyboardService: KeyboardService;
    private readonly meshStore: MeshStore;
    private readonly editorService: EditorService;
    private readonly eventService: EventService;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;

    private gizmoManagerAdapter: GizmoManagerAdapter;

    constructor(
        worldProvider: SceneService,
        gameObjectStore: GameObjectStore,
        meshStore: MeshStore,
        keyboardService: KeyboardService,
        editorService: EditorService,
        eventService: EventService,
        graphService: GraphService,
        materialStore: MaterialStore,
    ) {
        this.sceneService = worldProvider;
        this.gameObjectStore = gameObjectStore;
        this.meshStore = meshStore;
        this.keyboardService = keyboardService;
        this.editorService = editorService;
        this.eventService = eventService;
        this.graphService = graphService;
        this.materialStore = materialStore;
    }

    async setup(): Promise<void> {
        this.gizmoManagerAdapter = new GizmoManagerAdapter(this.sceneService, this.gameObjectStore, this.meshStore, this.eventService, this.editorService.selectionStore);

        this.editorService.toolController.addTool(new TransformTool(this.gizmoManagerAdapter, this.eventService, this.sceneService, ToolType.TRANSFORM));
        this.editorService.toolController.addTool(new TransformTool(this.gizmoManagerAdapter, this.eventService, this.sceneService, ToolType.ROTATE));
        this.editorService.toolController.addTool(new RouteTool(this.sceneService, this.materialStore, this.graphService, this.editorService.graphController));
        this.editorService.toolController.addTool(new RouteCreateTool(this.sceneService, this.materialStore, this.graphService, this.editorService.graphController));

        this.editorService.hotkeyController.addHotkey(new EraseHotkey(this.keyboardService, this.editorService.selectionStore, this.gameObjectStore, this.eventService));
        this.editorService.hotkeyController.enable();

        this.editorService.isEditorOpen = true;
    }
}