import { WorldObj } from "../../model/objs/WorldObj";
import { MeshObj } from "../../model/objs/MeshObj";
import { Lookup } from "../Lookup";

export class QuarterUpdater {
    private lookup: Lookup;

    constructor(lookup: Lookup) {
        this.lookup = lookup;
    }

    updateQuarterBasedOnPlayerPosition() {
        const world = this.lookup.worldProvider.world;
        const player = this.lookup.activeObj.getActivePlayer();

        if (world && player) {
            if (this.isQuarterChanged(world, player)) {
                this.updateActiveQuarter(world, player);
            }
        }
    }

    private isQuarterChanged(worldObj: WorldObj, player: MeshObj) {
        const quarter = worldObj.quarter.getQuarter(worldObj.camera.getQuarterIndex());
        const pos = player.getPosition2D();

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(worldObj: WorldObj, player: MeshObj): void {
        const pos = player.getPosition2D();

        const quarterIndex = worldObj.quarter.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        worldObj.camera.setQuarterIndex(quarterIndex);
    }
}