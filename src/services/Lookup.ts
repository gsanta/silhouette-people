import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./KeyboardService";
import { GuiService } from "./GuiService";
import { FactoryService } from "./FactoryService";
import { LoaderService } from "./LoaderService";
import { ControllerService } from "./ControllerService";
import { GlobalStore } from "../stores/GlobalStore";
import { UpdateService } from "./update/UpdateService";
import { ActiveMeshObjStoreDecorator } from "../stores/ActiveMeshObjStoreDecorator";
import { ActiveQuarterStoreDecorator } from "../stores/ActiveQuarterStoreDecorator";
import { WorldObjFactory } from "./factory/WorldObjFactory";
import { QuarterObjFactory } from "./factory/QuarterObjFactory";
import { ItemObjFactory } from "./factory/ItemObjFactory";

export class Lookup {
    keyboard: KeyboardService;

    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;

    debug: DebugService;
    gui: GuiService;
    factory: FactoryService;
    loader: LoaderService;
    controller: ControllerService;
    update: UpdateService;
    
    itemFactory: ItemObjFactory;
    quarterFactory: QuarterObjFactory;
    worldFactory: WorldObjFactory;

    globalStore: GlobalStore;
    activeObj: ActiveMeshObjStoreDecorator;
    activeQuarters: ActiveQuarterStoreDecorator;
    
    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardService(this);
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.factory = new FactoryService(this);
        this.loader = new LoaderService(this);
        this.controller = new ControllerService(this);
        this.globalStore = new GlobalStore();
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