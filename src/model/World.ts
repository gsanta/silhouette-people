import { Scene } from "babylonjs";
import { AreaService } from "../services/area/AreaService";
import { DebugService } from "../services/debug/DebugService";
import { GameObjectStore } from "../stores/GameObjectStore";
import { KeyboardHandler } from "../controller/KeyboardHandler";
import { GuiService } from "../services/gui/GuiService";
import { LevelService } from "../services/level/LevelService";

export class World {
    keyboard: KeyboardHandler;

    scene: Scene;

    ai: AreaService;
    debug: DebugService;
    gui: GuiService;
    level: LevelService;

    store: GameObjectStore;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
        this.ai = new AreaService();
        this.debug = new DebugService(this);
        this.store = new GameObjectStore();
        this.gui = new GuiService(this);
        this.level = new LevelService(this);
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