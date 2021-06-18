import { InjectProperty } from "../../../di/diDecorators";
import { GameObjectStore } from "../../../store/GameObjectStore";
import { KeyboardListener, KeyboardService } from "../keyboard/KeyboardService";
import { lookup } from "../../Lookup";
import { WorldProvider } from "../../WorldProvider";
import { QuarterUpdater } from "../../object/quarter/QuarterUpdater";

export class UpdateService implements KeyboardListener {

    @InjectProperty('WorldProvider')
    private worldProvider: WorldProvider;

    @InjectProperty("MeshStore")
    private meshStore: GameObjectStore;

    @InjectProperty("KeyboardService")
    private keyboardService: KeyboardService;

    private quarterUpdater: QuarterUpdater;

    constructor() {
        this.worldProvider = lookup.worldProvider;
        this.meshStore = lookup.meshStore;
        this.keyboardService = lookup.keyboard;

        this.keyboardService.addListener(this);
        this.quarterUpdater = new QuarterUpdater();
    }

    onKeyDown(e: KeyboardEvent): void {
    }

    onKeyUp(e: KeyboardEvent): void {}

    update() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();

        const deltaTime = this.worldProvider.world.engine.getDeltaTime();
        this.meshStore.getAll().forEach(gameObject => gameObject.update(deltaTime));
    }
}