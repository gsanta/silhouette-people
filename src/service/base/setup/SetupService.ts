import { Scene } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { DebugPanel } from "../debug/DebugPanel";
import { PointerService } from "../pointer/PointerService";
import { Lookup } from "../../Lookup";
import { BikeParenter } from "./BikeParenter";
import { MeshStore } from "../../../store/MeshStore";
import { HumanoidObj } from "../../../model/object/character/CharacterObj";
import { ToolService } from "../../edit/ToolService";
import { KeyboardService } from "../keyboard/KeyboardService";

export class SetupService {

    @InjectProperty("PointerService")
    private pointerService: PointerService;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private lookup: Lookup;
    private _isReady = false;

    private bikeParenter: BikeParenter;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
        this.pointerService = lookup.pointer;
        this.meshStore = lookup.meshStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;
        this.bikeParenter = new BikeParenter();
    }

    isReady() {
        return this._isReady;
    }

    async setup(scene: Scene) {
        // this.controllerService.setMasterController(new NormalModeController(this.controllerService.getCameraController()));
        this.lookup.worldProvider.world = await this.lookup.worldFactory.createWorldObj('level-1', scene);
        this.lookup.debug.addGuiComponent(new DebugPanel());
        this.lookup.debug.render();
        this.pointerService.listen();
        
        this._isReady = true;
        
        this.toolService.setSelectedTool(this.toolService.path, true);

        this.bikeParenter.parentToBike(<HumanoidObj> this.meshStore.getById('player1'), this.meshStore.getBikes()[0], this.keyboardService);
    }
}