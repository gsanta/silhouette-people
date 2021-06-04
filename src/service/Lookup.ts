import { Engine, Scene } from "babylonjs";
import { DebugService } from "./base/debug/DebugService";
import { KeyboardService } from "./base/keyboard/KeyboardService";
import { RenderGuiService } from "./ui/RenderGuiService";
import { SetupService } from "./base/setup/SetupService";
import { WorldProvider } from "./WorldProvider";
import { UpdateService } from "./base/update/UpdateService";
import { MeshFactory } from "./object/mesh/MeshFactory";
import { PointerService } from "./base/pointer/PointerService";
import { QuarterStore } from "../store/QuarterStore";
import { MeshStore } from "../store/MeshStore";
import { RouteFactory } from "./routing/route/RouteFactory";
import { LightStore } from "../store/LightStore";
import { LightFactory } from "./object/light/LightFactory";
import { ActivePlayerService } from "./ActivePlayerService";
import { MaterialStore } from "../store/MaterialStore";
import { RouteStore } from "../store/RouteStore";
import { ToolService } from "./edit/ToolService";
import { AssetContainerStore } from "../store/AssetContainerStore";
import { CameraService } from "./edit/camera/CameraService";
import { StageController } from "./ui/stage/StageController";
import { RoutePool } from "./citizen/RoutePool";
import { EventService } from "./base/EventService";
import { CitizenStore } from "../store/CitizenStore";
import { StoryTracker } from "./story/StoryTracker";
import { PlayerStore } from "./player/PlayerStore";
import { GraphService } from "./graph/GraphService";

export class Lookup {
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
    setup: SetupService;
    update: UpdateService;

    cameraService: CameraService;
    
    meshFactory: MeshFactory;
    routeFactory: RouteFactory;
    lightFactory: LightFactory;

    worldProvider: WorldProvider;

    materialStore: MaterialStore;
    quarterStore: QuarterStore;
    meshStore: MeshStore;
    citizenStore: CitizenStore;
    playerStore: PlayerStore;
    assetContainerStore: AssetContainerStore;
    lightStore: LightStore;
    routeStore: RouteStore;
    toolService: ToolService;

    stageController: StageController;

    routePool: RoutePool;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.worldProvider = new WorldProvider();
        lookup.worldProvider = this.worldProvider;

        this.eventService = new EventService();
        lookup.eventService = this.eventService;

        this.keyboard = new KeyboardService();
        lookup.keyboard = this.keyboard;

        this.backlog = new StoryTracker();
        lookup.backlog = this.backlog;

        this.routeStore = new RouteStore();
        lookup.routeStore = this.routeStore;

        this.routeFactory = new RouteFactory();
        lookup.routeFactory = this.routeFactory;

        this.routePool = new RoutePool();
        lookup.routePool = this.routePool;
        this.materialStore = new MaterialStore();
        lookup.materialStore = this.materialStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.meshStore = new MeshStore();
        lookup.meshStore = this.meshStore;
        this.citizenStore = new CitizenStore();
        lookup.citizenStore = this.citizenStore;
        this.playerStore = new PlayerStore();
        lookup.playerStore = this.playerStore;
        this.assetContainerStore = new AssetContainerStore();
        lookup.assetContainerStore = this.assetContainerStore;
        this.lightStore = new LightStore();
        lookup.lightStore = this.lightStore;

        this.graphService = new GraphService();
        lookup.graphService = this.graphService;
        
        this.renderGui = new RenderGuiService();
        lookup.renderGui = this.renderGui;
        this.toolService = new ToolService();
        lookup.toolService = this.toolService;
        this.cameraService = new CameraService();
        lookup.cameraService = this.cameraService;

        this.pointer = new PointerService();
        lookup.pointer = this.pointer;

        this.lightFactory = new LightFactory();
        lookup.lightFactory = this.lightFactory;

        this.activePlayerService = new ActivePlayerService();
        lookup.activePlayerService = this.activePlayerService;

        this.debugService = new DebugService();
        lookup.debugService = this.debugService;

        this.meshFactory = new MeshFactory();
        lookup.meshFactory = this.meshFactory;

        this.stageController = new StageController();
        lookup.stageController = this.stageController;

        this.setup = new SetupService();
        this.update = new UpdateService();
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

export const lookup: Partial<Lookup> = {}