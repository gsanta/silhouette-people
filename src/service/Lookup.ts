import { Engine, Scene } from "babylonjs";
import { DebugService } from "./base/debug/DebugService";
import { KeyboardService } from "./base/keyboard/KeyboardService";
import { RenderGuiService } from "./ui/RenderGuiService";
import { SetupService } from "./base/setup/SetupService";
import { WorldProvider } from "./object/world/WorldProvider";
import { UpdateService } from "./base/update/UpdateService";
import { WorldFactory } from "./object/world/WorldFactory";
import { QuarterFactory } from "./object/quarter/QuarterFactory";
import { MeshFactory } from "./object/mesh/MeshFactory";
import { PointerService } from "./base/pointer/PointerService";
import { QuarterStore } from "../store/QuarterStore";
import { MeshStore } from "../store/MeshStore";
import { RouteFactory } from "./object/route/RouteFactory";
import { LightStore } from "../store/LightStore";
import { LightFactory } from "./object/light/LightFactory";
import { ActivePlayerService } from "./ActivePlayerService";
import { MaterialStore } from "../store/MaterialStore";
import { RouteStore } from "../store/RouteStore";
import { ToolService } from "./edit/ToolService";
import { AssetContainerStore } from "../store/AssetContainerStore";
import { CameraService } from "./edit/camera/CameraService";
import { StageController } from "./ui/stage/StageController";

export class Lookup {
    keyboard: KeyboardService;
    pointer: PointerService;

    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;

    debug: DebugService;
    activePlayerService: ActivePlayerService;

    renderGui: RenderGuiService;
    setup: SetupService;
    update: UpdateService;

    cameraService: CameraService;
    
    meshFactory: MeshFactory;
    quarterFactory: QuarterFactory;
    worldFactory: WorldFactory;
    routeFactory: RouteFactory;
    lightFactory: LightFactory;

    worldProvider: WorldProvider;

    materialStore: MaterialStore;
    quarterStore: QuarterStore;
    meshStore: MeshStore;
    assetContainerStore: AssetContainerStore;
    lightStore: LightStore;
    routeStore: RouteStore;
    toolService: ToolService;

    stageController: StageController;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.worldProvider = new WorldProvider();
        lookup.worldProvider = this.worldProvider;

        this.keyboard = new KeyboardService();
        lookup.keyboard = this.keyboard;

        this.routeStore = new RouteStore();
        lookup.routeStore = this.routeStore;

        this.routeFactory = new RouteFactory();
        lookup.routeFactory = this.routeFactory;

        this.materialStore = new MaterialStore();
        lookup.materialStore = this.materialStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.meshStore = new MeshStore();
        lookup.meshStore = this.meshStore;
        this.assetContainerStore = new AssetContainerStore();
        lookup.assetContainerStore = this.assetContainerStore;
        this.lightStore = new LightStore();
        lookup.lightStore = this.lightStore;
        
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

        this.debug = new DebugService();
        lookup.debug = this.debug;


        this.meshFactory = new MeshFactory(this);
        this.quarterFactory = new QuarterFactory();
        this.worldFactory = new WorldFactory(this);

        this.stageController = new StageController();
        lookup.stageController = this.stageController;

        this.setup = new SetupService(this);
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