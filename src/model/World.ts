import { Scene } from "babylonjs";
import { AreaService } from "../services/area/AreaService";
import { DebugService } from "../services/debug/DebugService";
import { GameObjectStore } from "../stores/GameObjectStore";
import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GuiService } from "../services/gui/GuiService";

export class World {
    keyboard: KeyboardHandler;

    scene: Scene;

    ai: AreaService;
    debug: DebugService;
    gui: GuiService;

    store: GameObjectStore;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
        this.ai = new AreaService();
        this.debug = new DebugService(this);
        this.store = new GameObjectStore();
        this.gui = new GuiService(this);
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