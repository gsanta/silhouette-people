import { Scene } from "babylonjs";
import { CameraController } from "../controllers/CameraController";
import { PlayerController } from "../controllers/PlayerController";
import { InjectProperty } from "../di/diDecorators";
import { ControllerService } from "./ControllerService";
import { DebugPanel } from "./debug/DebugPanel";
import { Lookup } from "./Lookup";

export class SetupService {
    private lookup: Lookup;
    private _isReady = false;

    @InjectProperty("ControllerService")
    private controllerService: ControllerService;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.controllerService = lookup.controller;
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        this.controllerService.addController(new PlayerController(this.lookup));
        this.controllerService.addController(new CameraController());
        this.lookup.worldProvider.world = await this.lookup.worldFactory.createWorldObj('level-1', scene);
        this.lookup.debug.addGuiComponent(new DebugPanel());

        this._isReady = true;
    }
}