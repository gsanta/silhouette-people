import { DistrictObj } from "../model/objs/DistrictObj";
import { GameObj } from "../model/objs/GameObj";
import { World } from "../services/World";
import { AbstractController } from "./IController";

export class DistrictController extends AbstractController {
    private world: World;

    constructor(world: World) {
        super();
        this.world = world;
    }

    update() {
        const district = this.world.districtStore.getActiveDistrict();
        const player = district.activeComp.getPlayer();

        if (district && player) {
            if (this.isQuarterChanged(district, player)) {
                this.updateActiveQuarter(district, player);
            }
        }

    }

    private isQuarterChanged(district: DistrictObj, player: GameObj) {
        const camera = this.world.globalStore.getCamera();
        const quarter = district.activeComp.getQuarter(camera.getQuarterIndex());
        const pos = player.getPosition2D();

        return !quarter.containsPoint2D(pos);
    }

    private updateActiveQuarter(district: DistrictObj, player: GameObj): void {
        const camera = this.world.globalStore.getCamera();
        const pos = player.getPosition2D();

        const quarterIndex = district.activeComp.getAllQuarters().findIndex(quarter => quarter.containsPoint2D(pos));
        camera.setQuarterIndex(quarterIndex);
    }
}