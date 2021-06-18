import { InjectProperty } from "../../../di/diDecorators";
import { QuarterStore } from "../../../store/QuarterStore";
import { WorldProvider } from "../../WorldProvider";
import { lookup } from "../../Lookup";
import { PlayerStore } from "../../player/PlayerStore";
import { GameObject } from "../../../model/objects/game_object/GameObject";

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

    updateActiveQuarter() {
        const player = this.playerStore.getActivePlayer();

        if (player) {
            this.updateQuarterIfNeeded(player);
        }
    }

    private updateQuarterIfNeeded(player: GameObject) {
        const pos = player.position2D;
        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));

        this.worldProvider.world.activeQuarterIndex = quarterIndex;
    }
}