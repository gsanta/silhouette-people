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
import { WorldProvider } from "./WorldProvider";
import { MaterialSetup } from "./material/MaterialSetup";

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

    worldProvider: WorldProvider;

    materialStore: MaterialStore;
    quarterStore: QuarterStore;
    meshStore: GameObjectStore;
    citizenStore: CitizenStore;
    playerStore: PlayerStore;
    assetContainerStore: AssetContainerStore;
    lightStore: LightStore;
    routeStore: RouteStore;

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

        this.routePool = new RoutePool();
        lookup.routePool = this.routePool;
        this.materialStore = new MaterialStore(this.worldProvider);
        lookup.materialStore = this.materialStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.meshStore = new GameObjectStore(this.quarterStore);
        lookup.meshStore = this.meshStore;
        this.citizenStore = new CitizenStore(this.meshStore);
        lookup.citizenStore = this.citizenStore;
        this.playerStore = new PlayerStore(this.meshStore);
        lookup.playerStore = this.playerStore;
        this.assetContainerStore = new AssetContainerStore();
        lookup.assetContainerStore = this.assetContainerStore;
        this.lightStore = new LightStore();
        lookup.lightStore = this.lightStore;

        this.graphService = new GraphService(this.worldProvider, this.materialStore);
        lookup.graphService = this.graphService;
        
        this.renderGui = new RenderGuiService(this.playerStore);
        lookup.renderGui = this.renderGui;
        this.cameraService = new CameraService(this.worldProvider);
        lookup.cameraService = this.cameraService;

        this.pointer = new PointerService(this.worldProvider, this.cameraService);
        lookup.pointer = this.pointer;

        this.lightFactory = new LightFactory(this.worldProvider);
        lookup.lightFactory = this.lightFactory;

        this.activePlayerService = new ActivePlayerService(this.playerStore, this.lightStore, this.lightFactory);
        lookup.activePlayerService = this.activePlayerService;

        this.debugService = new DebugService(this.meshStore, this.worldProvider, this.materialStore, this.citizenStore);
        if (window) {
            (<any> window).debugService = this.debugService;
        }
        lookup.debugService = this.debugService;

        this.meshFactory = new MeshFactory();
        lookup.meshFactory = this.meshFactory;

        this.update = new UpdateService(this.worldProvider, this.meshStore, this.playerStore, this.quarterStore, this.keyboard, this.cameraService);
        this.resolveSetups();
    }

    private async resolveSetups() {
        this.setupService = new SetupService(this.pointer, this.renderGui);

        const worldSetup = new WorldSetup(
            this.worldProvider,
            this.assetContainerStore,
            this.keyboard,
            this.activePlayerService,
            this.meshFactory,
            this.routeStore,
            this.graphService,
            this.backlog,
            this.meshStore,
            this.quarterStore,
            this.materialStore
        );
        const routeSetup = new RouteSetup(this.worldProvider, this.graphService, this.routeStore);
        const playerSetup = new PlayerSetup(this.worldProvider, this.playerStore, this.graphService, this.keyboard, this.activePlayerService, this.materialStore);
        const cameraSetup = new CameraSetup(this.worldProvider, this.quarterStore, this.keyboard, this.cameraService, this.playerStore);
        const citizenSetup = new CitizenSetup(this.routeStore, this.citizenStore, this.graphService);
        const materialSetup = new MaterialSetup(this.worldProvider, this.materialStore);

        this.setupService.addSetup(materialSetup);
        this.setupService.addSetup(worldSetup);
        this.setupService.addSetup(routeSetup);
        this.setupService.addSetup(playerSetup);
        this.setupService.addSetup(cameraSetup);
        this.setupService.addSetup(citizenSetup);
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