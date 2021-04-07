import { DistrictObj } from "../../model/objs/DistrictObj";
import { GameObj } from "../../model/objs/GameObj";
import { World } from "../World";

export class QuarterUpdater {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    updateQuarterBasedOnPlayerPosition() {
        const district = this.world.districtStore.getActiveDistrict();
        const player = this.world.activeObj.getPlayer();

        if (district && player) {
            if (this.isQuarterChanged(district, player)) {
                this.updateActiveQuarter(district, player);
            }
        }
    }

    private isQuarterChanged(district: DistrictObj, player: GameObj) {
        const camera = this.world.globalStore.getCamera();
        const quarter = district.quarter.getQuarter(camera.getQuarterIndex());
        const pos = player.getPosition2D();

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(district: DistrictObj, player: GameObj): void {
        const camera = this.world.globalStore.getCamera();
        const pos = player.getPosition2D();

        const quarterIndex = district.quarter.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        camera.setQuarterIndex(quarterIndex);
    }
}