import { Scene } from "babylonjs";
import { AreaService } from "../services/area/AreaService";
import { DebugService } from "../services/debug/DebugService";
import { KeyboardHandler } from "../controllers/KeyboardHandler";
import { GuiService } from "../services/gui/GuiService";
import { LevelService } from "../services/level/LevelService";
import { FactoryService } from "../services/FactoryService";
import { ImportService } from "../services/import/ImportService";
import { WorldStore } from "../stores/WorldStore";

export class World {
    keyboard: KeyboardHandler;

    scene: Scene;

    ai: AreaService;
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
        this.ai = new AreaService();
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