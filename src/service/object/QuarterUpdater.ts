import { QuarterStore } from "../../store/QuarterStore";
import { SceneService } from "../SceneService";
import { PlayerStore } from "../player/PlayerStore";
import { GameObject } from "../../model/objects/game_object/GameObject";

export class QuarterUpdater {
    private readonly playerStore: PlayerStore;
    private readonly quarterStore: QuarterStore;
    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService, playerStore: PlayerStore, quarterStore: QuarterStore) {
        this.playerStore = playerStore;
        this.quarterStore = quarterStore;
        this.worldProvider = worldProvider;
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