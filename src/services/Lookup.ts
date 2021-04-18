import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./input/KeyboardService";
import { RenderGuiService } from "./RenderGuiService";
import { SetupService } from "./game/SetupService";
import { ControllerService } from "./ControllerService";
import { WorldProvider } from "./WorldProvider";
import { UpdateService } from "./game/UpdateService";
import { WorldFactory } from "./factory/WorldFactory";
import { QuarterFactory } from "./factory/QuarterFactory";
import { MeshFactory } from "./factory/MeshFactory";
import { PointerService } from "./input/PointerService";
import { TileStore } from "../stores/TileStore";
import { TileFactory } from "./factory/TileFactory";
import { QuarterStore } from "../stores/QuarterStore";
import { MeshStore } from "../stores/MeshStore";
import { RouteFactory } from "./factory/RouteFactory";
import { LightStore } from "../stores/LightStore";
import { LightFactory } from "./factory/LightFactory";
import { ActivePlayerService } from "./ActivePlayerService";
import { GameModeService } from "./GameModeService";
import { MaterialStore } from "../stores/MaterialStore";
import { RouteStore } from "../stores/RouteStore";

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
    controller: ControllerService;
    update: UpdateService;
    gameMode: GameModeService;
    
    meshFactory: MeshFactory;
    quarterFactory: QuarterFactory;
    worldFactory: WorldFactory;
    routeFactory: RouteFactory;
    lightFactory: LightFactory;

    worldProvider: WorldProvider;

    materialStore: MaterialStore;
    tileStore: TileStore;
    quarterStore: QuarterStore;
    meshStore: MeshStore;
    lightStore: LightStore;
    routeStore: RouteStore;

    tileFactory: TileFactory;
    
    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.worldProvider = new WorldProvider();
        lookup.worldProvider = this.worldProvider;

        this.routeFactory = new RouteFactory();
        lookup.routeFactory = this.routeFactory;

        this.materialStore = new MaterialStore();
        lookup.materialStore = this.materialStore;
        this.tileStore = new TileStore();
        lookup.tileStore = this.tileStore;
        this.quarterStore = new QuarterStore();
        lookup.quarterStore = this.quarterStore;
        this.meshStore = new MeshStore();
        lookup.meshStore = this.meshStore;
        this.lightStore = new LightStore();
        lookup.lightStore = this.lightStore;
        this.routeStore = new RouteStore();
        lookup.routeStore = this.routeStore;

        this.renderGui = new RenderGuiService();
        lookup.renderGui = this.renderGui;
        this.controller = new ControllerService();
        lookup.controller = this.controller;
        this.keyboard = new KeyboardService();
        lookup.keyboard = this.keyboard;

        this.pointer = new PointerService();
        lookup.pointer = this.pointer;

        this.lightFactory = new LightFactory();
        lookup.lightFactory = this.lightFactory;

        this.activePlayerService = new ActivePlayerService();
        lookup.activePlayerService = this.activePlayerService;

        this.debug = new DebugService();
        lookup.debug = this.debug;

        this.tileFactory = new TileFactory();
        lookup.tileFactory = this.tileFactory;

        this.gameMode = new GameModeService();
        lookup.gameMode = this.gameMode;

        this.setup = new SetupService(this);
        this.update = new UpdateService();

        this.meshFactory = new MeshFactory(this);
        this.quarterFactory = new QuarterFactory();
        this.worldFactory = new WorldFactory(this);
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