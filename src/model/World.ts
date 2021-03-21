import { Scene } from "babylonjs";
import { DebugService } from "../services/DebugService";
import { KeyboardHandler } from "../controllers/KeyboardHandler";
import { GuiService } from "../services/GuiService";
import { WorldStore } from "../stores/WorldStore";
import { FactoryService } from "../services/FactoryService";
import { JsonStore } from "../stores/JsonStore";
import { LoaderService } from "../services/LoaderService";
import { EventService } from "../services/EventService";

export class World {
    keyboard: KeyboardHandler;

    scene: Scene;

    debug: DebugService;
    gui: GuiService;
    factory: FactoryService;
    loader: LoaderService;
    events: EventService;

    store: WorldStore;
    jsonStore: JsonStore;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.factory = new FactoryService(this);
        this.loader = new LoaderService(this);
        this.events = new EventService();
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