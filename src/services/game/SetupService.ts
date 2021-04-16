import { Scene } from "babylonjs";
import { CameraController } from "../../controllers/CameraController";
import { InjectProperty } from "../../di/diDecorators";
import { ControllerService } from "../ControllerService";
import { DebugPanel } from "../debug/DebugPanel";
import { PointerService } from "../input/PointerService";
import { Lookup } from "../Lookup";
import { NormalModeController } from "../NormalModeController";

export class SetupService {
    private lookup: Lookup;
    private _isReady = false;

    @InjectProperty("ControllerService")
    private controllerService: ControllerService;

    @InjectProperty("PointerService")
    private pointerService: PointerService;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.controllerService = lookup.controller;
        this.pointerService = lookup.pointer;
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        this.controllerService.setCameraController(new CameraController());
        this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        this.lookup.worldProvider.world = await this.lookup.worldFactory.createWorldObj('level-1', scene);
        this.lookup.debug.addGuiComponent(new DebugPanel());
        this.lookup.debug.render();
        this.pointerService.listen();

        this._isReady = true;
    }
}