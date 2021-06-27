import { Engine, Scene } from "babylonjs";
import { AssetContainerStore } from "../store/AssetContainerStore";
import { CitizenStore } from "../store/CitizenStore";
import { GameObjectStore } from "../store/GameObjectStore";
import { LightStore } from "../store/LightStore";
import { MaterialStore } from "../store/MaterialStore";
import { QuarterStore } from "../store/QuarterStore";
import { RouteStore } from "../store/RouteStore";
import { ActivePlayerService } from "./ActivePlayerService";
import { DebugService } from "./debug/DebugService";
import { EventService } from "./EventService";
import { KeyboardService } from "./input/KeyboardService";
import { PointerService } from "./input/PointerService";
import { SetupService } from "./setup/SetupService";
import { UpdateService } from "./UpdateService";
import { CameraService } from "./camera/CameraService";
import { CameraSetup } from "./camera/CameraSetup";
import { CitizenSetup } from "./citizen/CitizenSetup";
import { RoutePool } from "./citizen/RoutePool";
import { GraphService } from "./graph/GraphService";
import { LightFactory } from "./object/LightFactory";
import { MeshFactory } from "./object/mesh/MeshFactory";
import { WorldSetup } from "./object/WorldSetup";
import { PlayerSetup } from "./player/PlayerSetup";
import { PlayerStore } from "./player/PlayerStore";
import { RouteSetup } from "./routing/route/RouteSetup";
import { StoryTracker } from "./story/StoryTracker";
import { RenderGuiService } from "./RenderGuiService";
import { SceneService } from "./SceneService";
import { MaterialSetup } from "./material/MaterialSetup";
import { EditorSetup } from "./editor/EditorSetup";
import { MeshStore } from "../store/MeshStore";
import { EditorService } from "./editor/EditorService";
import { ModelPropertyParser } from "./import/parsers/ModelPropertyParser";
import { CollisionPropertyParser } from "./import/parsers/CollisionPropertyParser";
import { PositionPropertyParser } from "./import/parsers/PositionPropertyParser";
import { CameraController } from "./editor/controllers/CameraController";
import { MeshLoaderController } from "./editor/controllers/MeshLoaderController";
import { FogOfWarService } from "./fow/FogOfWarService";
import { FogOfWarController } from "./editor/controllers/FogOfWarController";
import { TagPropertyParser } from "./import/parsers/TagPropertyParser";
import { SceneExportController } from "./editor/controllers/SceneExportController";
import { SceneExporter } from "./editor/export/SceneExporter";
import { ToolController } from "./editor/controllers/ToolController";
import { TransformTool } from "./editor/tools/TransformTool";
import { ToolType } from "./editor/controllers/TransformController";
import { TexturePropertyParser } from "./import/parsers/TexturePropertyParser";
import { RotatePropertyParser } from "./import/parsers/RotatePropertyParser";
import { PointerController } from "./editor/controllers/PointerController";
import { GraphController } from "./editor/controllers/GraphController";

export class DependencyResolver {
    eventService: EventService;
    keyboard: KeyboardService;
    pointer: PointerService;

    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;

    backlog: StoryTracker;

    graphService: GraphService;
    debugService: DebugService;
    activePlayerService: ActivePlayerService;

    renderGui: RenderGuiService;
    setupService: SetupService;
    update: UpdateService;

    cameraService: CameraService;
    
    meshFactory: MeshFactory;
    lightFactory: LightFactory;

    sceneService: SceneService;

    private readonly meshStore: MeshStore;
    materialStore: MaterialStore;
    quarterStore: QuarterStore;
    gameObjecStore: GameObjectStore;
    citizenStore: CitizenStore;
    playerStore: PlayerStore;
    assetContainerStore: AssetContainerStore;
    lightStore: LightStore;
    routeStore: RouteStore;

    fogOfWarService: FogOfWarService;
    sceneExporter: SceneExporter;

    routePool: RoutePool;

    editorService: EditorService;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.sceneService = new SceneService();
        lookup.sceneService = this.sceneService;

        this.eventService = new EventService();
        lookup.eventService = this.eventService;

        this.keyboard = new KeyboardService();
        lookup.keyboard = this.keyboard;

        this.backlog = new StoryTracker();
        lookup.backlog = this.backlog;

        this.routeStore = new RouteStore();
        lookup.routeStore = this.routeStore;

        this.routePool = new RoutePool();
        lookup.routePool = this.routePool;
        this.meshStore = new MeshStore();
        this.materialStore = new MaterialStore(this.sceneService);
        lookup.materialStore = this.materialStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.gameObjecStore = new GameObjectStore(this.quarterStore);
        lookup.gameObjecStore = this.gameObjecStore;
        this.citizenStore = new CitizenStore(this.gameObjecStore);
        lookup.citizenStore = this.citizenStore;
        this.playerStore = new PlayerStore(this.gameObjecStore);
        lookup.playerStore = this.playerStore;
        this.assetContainerStore = new AssetContainerStore();
        lookup.assetContainerStore = this.assetContainerStore;
        this.lightStore = new LightStore();
        lookup.lightStore = this.lightStore;

        this.graphService = new GraphService(this.sceneService, this.materialStore);
        lookup.graphService = this.graphService;
        
        this.renderGui = new RenderGuiService(this.playerStore);
        lookup.renderGui = this.renderGui;
        this.cameraService = new CameraService(this.sceneService);
        lookup.cameraService = this.cameraService;

        this.pointer = new PointerService(this.sceneService, this.cameraService);
        lookup.pointer = this.pointer;

        this.lightFactory = new LightFactory(this.sceneService);
        lookup.lightFactory = this.lightFactory;

        this.activePlayerService = new ActivePlayerService(this.playerStore, this.lightStore, this.lightFactory);
        lookup.activePlayerService = this.activePlayerService;

        this.debugService = new DebugService(this.gameObjecStore, this.sceneService, this.materialStore, this.citizenStore);
        if (window) {
            (<any> window).debugService = this.debugService;
        }
        lookup.debugService = this.debugService;

        this.meshFactory = new MeshFactory(
            this.meshStore,
            new ModelPropertyParser(this.sceneService, this.assetContainerStore),
            new CollisionPropertyParser(this.sceneService),
            new PositionPropertyParser(),
            new TagPropertyParser(),
            new TexturePropertyParser(this.sceneService),
            new RotatePropertyParser()
        );
        lookup.meshFactory = this.meshFactory;

        this.fogOfWarService = new FogOfWarService(this.sceneService);
        this.sceneExporter = new SceneExporter(this.gameObjecStore);
        this.sceneService.addBaseService(this.fogOfWarService);

        const toolController = new ToolController(this.renderGui);

        this.editorService = new EditorService(
            new MeshLoaderController(this.keyboard, this.renderGui, this.meshFactory, this.gameObjecStore, this.eventService),
            new CameraController(this.cameraService, this.renderGui),
            new FogOfWarController(this.fogOfWarService, this.renderGui),
            new SceneExportController(this.sceneExporter),
            toolController,
            new PointerController(this.sceneService, toolController, this.keyboard),
            new GraphController(this.renderGui, this.graphService, this.materialStore)
        );

        this.update = new UpdateService(this.sceneService, this.gameObjecStore, this.playerStore, this.quarterStore, this.keyboard, this.cameraService);
        this.resolveSetups();
    }

    private async resolveSetups() {
        this.setupService = new SetupService(this.pointer, this.renderGui);

        const worldSetup = new WorldSetup(
            this.sceneService,
            this.assetContainerStore,
            this.keyboard,
            this.activePlayerService,
            this.meshFactory,
            this.routeStore,
            this.graphService,
            this.backlog,
            this.gameObjecStore,
            this.quarterStore,
            this.materialStore
        );
        const routeSetup = new RouteSetup(this.sceneService, this.graphService, this.routeStore);
        const playerSetup = new PlayerSetup(
            this.sceneService,
            this.playerStore,
            this.graphService,
            this.keyboard,
            this.activePlayerService,
            this.materialStore,
            this.fogOfWarService
        );
        const cameraSetup = new CameraSetup(this.sceneService, this.quarterStore, this.keyboard, this.cameraService, this.playerStore);
        const citizenSetup = new CitizenSetup(this.routeStore, this.citizenStore, this.graphService);
        const materialSetup = new MaterialSetup(this.sceneService, this.materialStore);
        const editorSetup = new EditorSetup(this.sceneService, this.gameObjecStore, this.meshStore, this.keyboard, this.editorService, this.eventService, this.graphService, this.materialStore);

        this.setupService.addSetup(materialSetup);
        this.setupService.addSetup(worldSetup);
        this.setupService.addSetup(routeSetup);
        this.setupService.addSetup(playerSetup);
        this.setupService.addSetup(cameraSetup);
        this.setupService.addSetup(citizenSetup);
        this.setupService.addSetup(editorSetup);
    }

    setScene(scene: Scene) {
        this.scene = scene;
        this.onReadyFuncs.forEach(func => func());
    }

    onReady(onReadyFunc: () => void) {
        if (this.isReady) {
            onReadyFunc();
        } else {
            this.onReadyFuncs.push(onReadyFunc);
        }
    }
}

export const lookup: Partial<DependencyResolver> = {}