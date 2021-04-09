import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./KeyboardService";
import { GuiService } from "./GuiService";
import { FactoryService } from "./FactoryService";
import { JsonStore } from "../stores/JsonStore";
import { LoaderService } from "./LoaderService";
import { ControllerService } from "./ControllerService";
import { GlobalStore } from "../stores/GlobalStore";
import { UpdateService } from "./update/UpdateService";
import { ActiveGameObjStoreDecorator } from "../stores/ActiveGameObjStoreDecorator";
import { ActiveQuarterStoreDecorator } from "../stores/ActiveQuarterStoreDecorator";
import { WorldObjFactory } from "./factory/WorldObjFactory";

export class Lookup {
    keyboard: KeyboardService;

    scene: Scene;
    engine: Engine;

    debug: DebugService;
    gui: GuiService;
    factory: FactoryService;
    worldFactory: WorldObjFactory;
    loader: LoaderService;
    controller: ControllerService;
    update: UpdateService;

    globalStore: GlobalStore;
    jsonStore: JsonStore;
    activeObj: ActiveGameObjStoreDecorator;
    activeQuarters: ActiveQuarterStoreDecorator;
    
    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardService(this);
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.factory = new FactoryService(this);
        this.worldFactory = new WorldObjFactory(this);
        this.loader = new LoaderService(this);
        this.controller = new ControllerService(this);
        this.globalStore = new GlobalStore();
        this.jsonStore = new JsonStore();
        this.update = new UpdateService(this);

        this.activeObj = new ActiveGameObjStoreDecorator(this);
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