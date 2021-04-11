import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./KeyboardService";
import { RenderGuiService } from "./RenderGuiService";
import { FactoryService } from "./FactoryService";
import { SetupService } from "./SetupService";
import { ControllerService } from "./ControllerService";
import { WorldProvider } from "../stores/WorldProvider";
import { UpdateService } from "./update/UpdateService";
import { ActiveMeshObjStoreDecorator } from "../stores/ActiveMeshObjStoreDecorator";
import { ActiveQuarterStoreDecorator } from "../stores/ActiveQuarterStoreDecorator";
import { WorldObjFactory } from "./factory/WorldObjFactory";
import { QuarterObjFactory } from "./factory/QuarterObjFactory";
import { ItemObjFactory } from "./factory/ItemObjFactory";
import { PointerService } from "./PointerService";
import { TileStore } from "../stores/TileStore";
import { TileFactory } from "./factory/TileFactory";

export class Lookup {
    keyboard: KeyboardService;
    pointer: PointerService;

    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;

    debug: DebugService;
    renderGui: RenderGuiService;
    factory: FactoryService;
    setup: SetupService;
    controller: ControllerService;
    update: UpdateService;
    
    itemFactory: ItemObjFactory;
    quarterFactory: QuarterObjFactory;
    worldFactory: WorldObjFactory;

    worldProvider: WorldProvider;
    activeObj: ActiveMeshObjStoreDecorator;
    activeQuarters: ActiveQuarterStoreDecorator;

    tileStore: TileStore;

    tileFactory: TileFactory;
    
    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.worldProvider = new WorldProvider();
        lookup.worldProvider = this.worldProvider;
        this.tileStore = new TileStore();
        lookup.tileStore = this.tileStore;
        this.renderGui = new RenderGuiService();
        lookup.renderGui = this.renderGui;
        this.controller = new ControllerService();
        lookup.controller = this.controller;
        this.keyboard = new KeyboardService();
        lookup.keyboard = this.keyboard;

        this.pointer = new PointerService();
        lookup.pointer = this.pointer;

        this.debug = new DebugService();
        lookup.debug = this.debug;

        this.tileFactory = new TileFactory();
        lookup.tileFactory = this.tileFactory;

        this.factory = new FactoryService(this);
        this.setup = new SetupService(this);
        this.update = new UpdateService(this);
        
        this.itemFactory = new ItemObjFactory(this);
        this.quarterFactory = new QuarterObjFactory(this);
        this.worldFactory = new WorldObjFactory(this);

        this.activeObj = new ActiveMeshObjStoreDecorator(this);
        this.activeQuarters = new ActiveQuarterStoreDecorator(this);
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