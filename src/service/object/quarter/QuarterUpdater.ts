import { InjectProperty } from "../../../di/diDecorators";
import { MeshObj } from "../../../model/general/objs/MeshObj";
import { MeshStore } from "../../../store/MeshStore";
import { QuarterStore } from "../../../store/QuarterStore";
import { WorldProvider } from "../world/WorldProvider";
import { lookup } from "../../Lookup";

export class QuarterUpdater {
    @InjectProperty("MeshStore")
    private meshStore: MeshStore;

    @InjectProperty("QuarterStore")
    private quarterStore: QuarterStore;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.meshStore = lookup.meshStore;
        this.quarterStore = lookup.quarterStore;
        this.worldProvider = lookup.worldProvider;
    }

    updateQuarterBasedOnPlayerPosition() {
        const player = this.meshStore.getActivePlayer();

        if (player) {
            if (this.isQuarterChanged(player)) {
                this.updateActiveQuarter(player);
            }
        }
    }

    private isQuarterChanged(player: MeshObj) {
        const camera = this.worldProvider.world.camera.getQuarterIndex();
        const quarter = this.quarterStore.getQuarter(camera);
        const pos = player.instance.getPosition2D();

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(player: MeshObj): void {
        const pos = player.instance.getPosition2D();

        const quarterIndex = this.quarterStore.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        this.worldProvider.world.camera.setQuarterIndex(quarterIndex);
    }
}