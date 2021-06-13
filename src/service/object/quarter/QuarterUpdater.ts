import { InjectProperty } from "../../../di/diDecorators";
import { GameObject } from "../../../model/objects/game_object/GameObject";
import { QuarterStore } from "../../../store/QuarterStore";
import { WorldProvider } from "../../WorldProvider";
import { lookup } from "../../Lookup";
import { PlayerStore } from "../../player/PlayerStore";

export class QuarterUpdater {
    @InjectProperty("PlayerStore")
    private playerStore: PlayerStore;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.playerStore = lookup.playerStore;
        this.quarterStore = lookup.quarterStore;
        this.worldProvider = lookup.worldProvider;
    }

    updateQuarterBasedOnPlayerPosition() {
        const player = this.playerStore.getActivePlayer();

        if (player) {
            if (this.isQuarterChanged(player)) {
                this.updateActiveQuarter(player);
            }
        }
    }

    private isQuarterChanged(player: GameObject) {
        const camera = this.worldProvider.world.camera.getQuarterIndex();
        const quarter = this.quarterStore.getQuarter(camera);
        const pos = player.position2D;

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(player: GameObject): void {
        const pos = player.position2D;

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        this.worldProvider.world.camera.setQuarterIndex(quarterIndex);
    }
}