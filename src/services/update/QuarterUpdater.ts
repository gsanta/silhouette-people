import { WorldObj } from "../../model/objs/WorldObj";
import { GameObj } from "../../model/objs/GameObj";
import { Lookup } from "../Lookup";

export class QuarterUpdater {
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    updateQuarterBasedOnPlayerPosition() {
        const world = this.lookup.globalStore.getWorld();
        const player = this.lookup.activeObj.getPlayer();

        if (world && player) {
            if (this.isQuarterChanged(world, player)) {
                this.updateActiveQuarter(world, player);
            }
        }
    }

    private isQuarterChanged(district: WorldObj, player: GameObj) {
        const camera = this.lookup.globalStore.getCamera();
        const quarter = district.quarter.getQuarter(camera.getQuarterIndex());
        const pos = player.getPosition2D();

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(district: WorldObj, player: GameObj): void {
        const camera = this.lookup.globalStore.getCamera();
        const pos = player.getPosition2D();

        const quarterIndex = district.quarter.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        camera.setQuarterIndex(quarterIndex);
    }
}