import { Engine, Scene } from "babylonjs";
import { AssetContainerStore } from "../store/AssetContainerStore";
import { CitizenStore } from "../store/CitizenStore";
import { GameObjectStore } from "../store/GameObjectStore";
import { LightStore } from "../store/LightStore";
import { MaterialStore } from "../store/MaterialStore";
import { QuarterStore } from "../store/QuarterStore";
import { RouteStore } from "../store/RouteStore";
import { ActivePlayerService } from "./ActivePlayerService";
import { DebugController } from "./editor/controllers/DebugController";
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
import { GameObjectFactory } from "./object/mesh/GameObjectFactory";
import { WorldSetup } from "./object/WorldSetup";
import { PlayerSetup } from "./player/PlayerSetup";
import { PlayerStore } from "./player/PlayerStore";
import { RouteSetup } from "./routing/route/RouteSetup";
import { RenderGuiService } from "./RenderGuiService";
import { SceneService } from "./SceneService";
import { MaterialSetup } from "./material/MaterialSetup";
import { EditorSetup } from "./editor/EditorSetup";
import { MeshStore } from "../store/MeshStore";
import { EditorService } from "./editor/EditorService";
import { ModelPropertyParser } from "./import/parsers/ModelPropertyParser";
import { CollisionCreator } from "./import/parsers/CollisionCreator";
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
import { GameObjectController } from "./editor/controllers/GameObjectController";
import { RouteController } from "./editor/controllers/RouteController";
import { RouteFactory } from "./routing/RouteFactory";
import { RouteMapExporter } from "./editor/export/RouteMapExporter";
import { RouteExporter } from "./editor/export/RouteExporter";
import { GameObjectExporter } from "./editor/export/GameObjectExporter";

export class DependencyResolver {
    eventService: EventService;
    keyboard: KeyboardService;
    pointer: PointerService;

    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;

    graphService: GraphService;
    debugService: DebugController;
    activePlayerService: ActivePlayerService;

    renderGui: RenderGuiService;
    setupService: SetupService;
    update: UpdateService;

    cameraService: CameraService;
    
    meshFactory: GameObjectFactory;
    lightFactory: LightFactory;
    routeFactory: RouteFactory;

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

        this.routeStore = new RouteStore();
        lookup.routeStore = this.routeStore;

        this.routePool = new RoutePool();
        lookup.routePool = this.routePool;
        this.meshStore = new MeshStore();
        this.materialStore = new MaterialStore(this.sceneService);
        lookup.materialStore = this.materialStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.gameObjecStore = new GameObjectStore(this.quarterStore, this.meshStore);
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

        this.routeFactory = new RouteFactory(this.gameObjecStore, this.routeStore, this.graphService);

        this.activePlayerService = new ActivePlayerService(this.playerStore, this.lightStore, this.lightFactory);
        lookup.activePlayerService = this.activePlayerService;

        this.debugService = new DebugController(this.gameObjecStore, this.renderGui);
        if (window) {
            (<any> window).debugService = this.debugService;
        }
        lookup.debugService = this.debugService;

        this.meshFactory = new GameObjectFactory(
            this.meshStore,
            new ModelPropertyParser(this.sceneService, this.assetContainerStore),
            new CollisionCreator(this.sceneService),
            new PositionPropertyParser(),
            new TagPropertyParser(),
            new TexturePropertyParser(this.sceneService),
            new RotatePropertyParser()
        );
        lookup.meshFactory = this.meshFactory;

        this.fogOfWarService = new FogOfWarService(this.sceneService);
        this.sceneExporter = new SceneExporter(new GameObjectExporter(this.gameObjecStore), new RouteMapExporter(this.graphService), new RouteExporter(this.routeStore));
        this.sceneService.addBaseService(this.fogOfWarService);

        const toolController = new ToolController(this.renderGui);

        const debugController = new DebugController(this.gameObjecStore, this.renderGui);
        
        this.editorService = new EditorService(
            new MeshLoaderController(this.keyboard, this.renderGui, this.meshFactory, this.gameObjecStore, this.eventService),
            new CameraController(this.cameraService, this.renderGui),
            new FogOfWarController(this.fogOfWarService, this.renderGui),
            new SceneExportController(this.sceneExporter),
            toolController,
            new PointerController(this.sceneService, toolController, this.keyboard),
            new GraphController(this.renderGui, this.graphService, this.materialStore, toolController),
            debugController,
            new GameObjectController(new CollisionCreator(this.sceneService), this.renderGui, this.eventService, debugController, this.gameObjecStore),
            new RouteController(this.renderGui, this.eventService, this.graphService, this.routeStore, this.routeFactory),
            this.eventService
        );

        this.update = new UpdateService(this.sceneService, this.gameObjecStore, this.playerStore, this.quarterStore, this.keyboard, this.cameraService);
        this.resolveSetups();
    }

    private async resolveSetups() {
        this.setupService = new SetupService(this.pointer, this.renderGui);

        const playerSetup = new PlayerSetup(
            this.sceneService,
            this.playerStore,
            this.graphService,
            this.keyboard,
            this.activePlayerService,
            this.materialStore,
            this.fogOfWarService
        );

        const worldSetup = new WorldSetup(
            this.sceneService,
            this.assetContainerStore,
            this.keyboard,
            this.activePlayerService,
            this.meshFactory,
            this.routeStore,
            this.graphService,
            this.gameObjecStore,
            this.quarterStore,
            this.materialStore,
            playerSetup
        );
        const routeSetup = new RouteSetup(this.routeStore, this.routeFactory, this.materialStore, this.sceneService);

        const cameraSetup = new CameraSetup(this.sceneService, this.quarterStore, this.keyboard, this.cameraService, this.playerStore);
        const citizenSetup = new CitizenSetup(this.routeStore, this.citizenStore, this.graphService);
        const materialSetup = new MaterialSetup(this.sceneService, this.materialStore);
        const editorSetup = new EditorSetup(this.sceneService, this.gameObjecStore, this.meshStore, this.keyboard, this.editorService, this.eventService, this.graphService, this.materialStore, this.renderGui);

        this.setupService.addSetup(materialSetup);
        this.setupService.addSetup(worldSetup);
        this.setupService.addSetup(routeSetup);
        // this.setupService.addSetup(playerSetup);
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