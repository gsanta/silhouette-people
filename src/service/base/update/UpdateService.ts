import { InjectProperty } from "../../../di/diDecorators";
import { CharacterObj } from "../../../model/object/character/CharacterObj";
import { MeshStore } from "../../../store/MeshStore";
import { KeyboardListener, KeyboardService } from "../keyboard/KeyboardService";
import { lookup } from "../../Lookup";
import { ToolService } from "../../edit/ToolService";
import { WorldProvider } from "../../object/world/WorldProvider";
import { QuarterUpdater } from "../../object/quarter/QuarterUpdater";

export class UpdateService implements KeyboardListener {

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("ToolService")
    private toolService: ToolService;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private quarterUpdater: QuarterUpdater;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
        this.toolService = lookup.toolService;
        this.keyboardService = lookup.keyboard;

        this.keyboardService.addListener(this);
        this.quarterUpdater = new QuarterUpdater();
    }

    onKeyDown(e: KeyboardEvent): void {}

    onKeyUp(e: KeyboardEvent): void {
        switch(e.key) {
            case 'Escape':
                if (this.toolService.getSelectedTool()) {
                    this.toolService.getSelectedTool().cancel();
                }
            break;
        }
    }

    beforeRender() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();

        const activePlayer = <CharacterObj> this.meshStore.getById('player2');

        if (!activePlayer) { return; }

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();

        const selectedTool = this.toolService.getSelectedTool();
        if (selectedTool) {
            selectedTool.beforeRender();
        }
    }
}