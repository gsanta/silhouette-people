import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./KeyboardService";
import { GuiService } from "./GuiService";
import { WorldStore } from "../stores/WorldStore";
import { FactoryService } from "./FactoryService";
import { JsonStore } from "../stores/JsonStore";
import { LoaderService } from "./LoaderService";
import { EventService } from "./EventService";
import { ControllerService } from "./ControllerService";

export class World {
    keyboard: KeyboardService;

    scene: Scene;
    engine: Engine;

    debug: DebugService;
    gui: GuiService;
    factory: FactoryService;
    loader: LoaderService;
    events: EventService;
    controller: ControllerService;

    store: WorldStore;
    jsonStore: JsonStore;
    

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardService(this);
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.factory = new FactoryService(this);
        this.loader = new LoaderService(this);
        this.events = new EventService();
        this.controller = new ControllerService(this);
        this.store = new WorldStore();
        this.jsonStore = new JsonStore();
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