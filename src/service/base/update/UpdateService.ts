import { InjectProperty } from "../../../di/diDecorators";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { KeyboardListener, KeyboardService } from "../keyboard/KeyboardService";
import { lookup } from "../../Lookup";
import { ToolService } from "../../edit/ToolService";
import { WorldProvider } from "../../WorldProvider";
import { QuarterUpdater } from "../../object/quarter/QuarterUpdater";
import { StageController } from "../../ui/stage/StageController";

export class UpdateService implements KeyboardListener {

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty("MeshStore")
    private meshStore: GameObjectStore;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    @InjectProperty("StageController")
    private stageController: StageController;

    private quarterUpdater: QuarterUpdater;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;
        this.stageController = lookup.stageController;

        this.keyboardService.addListener(this);
        this.quarterUpdater = new QuarterUpdater();
    }

    onKeyDown(e: KeyboardEvent): void {}

    onKeyUp(e: KeyboardEvent): void {}

    update() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.meshStore.getAll().forEach(gameObject => gameObject.update(deltaTime));

        // const activePlayer = this.meshStore.getById('player2');

        // if (!activePlayer) { return; }


        // const selectedTool = this.toolService.getSelectedTool();
        // if (selectedTool) {
        //     selectedTool.beforeRender();
        // }
    }
}