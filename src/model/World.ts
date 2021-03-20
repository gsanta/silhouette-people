import { Scene } from "babylonjs";
import { DebugService } from "../services/DebugService";
import { KeyboardHandler } from "../controllers/KeyboardHandler";
import { GuiService } from "../services/GuiService";
import { LevelService } from "../services/LevelService";
import { ImportService } from "../services/ImportService";
import { WorldStore } from "../stores/WorldStore";
import { FactoryService } from "../services/FactoryService";

export class World {
    keyboard: KeyboardHandler;

    scene: Scene;

    debug: DebugService;
    gui: GuiService;
    level: LevelService;
    factory: FactoryService;
    import: ImportService;

    store: WorldStore;

    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardHandler();
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.level = new LevelService(this);
        this.factory = new FactoryService(this);
        this.import = new ImportService(this);

        this.store = new WorldStore();
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