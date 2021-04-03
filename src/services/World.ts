import { Engine, Scene } from "babylonjs";
import { DebugService } from "./DebugService";
import { KeyboardService } from "./KeyboardService";
import { GuiService } from "./GuiService";
import { DistrictStore } from "../stores/DistrictStore";
import { FactoryService } from "./FactoryService";
import { JsonStore } from "../stores/JsonStore";
import { LoaderService } from "./LoaderService";
import { ControllerService } from "./ControllerService";
import { ArcRotateCamera } from "babylonjs/Cameras/arcRotateCamera";
import { GlobalStore } from "../stores/GlobalStore";
import { DistrictService } from "./district/DistrictService";
import { UpdateService } from "./update/UpdateService";

export class World {
    keyboard: KeyboardService;

    scene: Scene;
    engine: Engine;

    debug: DebugService;
    gui: GuiService;
    factory: FactoryService;
    loader: LoaderService;
    controller: ControllerService;
    district: DistrictService;
    update: UpdateService;

    districtStore: DistrictStore;
    globalStore: GlobalStore;
    jsonStore: JsonStore;
    
    private isReady: boolean = false;
    private onReadyFuncs: (() => void)[] = [];

    constructor() {
        this.keyboard = new KeyboardService(this);
        this.debug = new DebugService(this);
        this.gui = new GuiService(this);
        this.factory = new FactoryService(this);
        this.loader = new LoaderService(this);
        this.controller = new ControllerService(this);
        this.districtStore = new DistrictStore();
        this.globalStore = new GlobalStore();
        this.jsonStore = new JsonStore();
        this.district = new DistrictService(this);
        this.update = new UpdateService(this);
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