import { DistrictObj } from "../../model/objs/DistrictObj";
import { DistrictActivator } from "./DistrictActivator";
import { World } from "../World";

export class DistrictService {
    private world: World;
    private districtActivator: DistrictActivator;

    constructor(world: World) {
        this.world = world;

        this.districtActivator = new DistrictActivator(this.world);
    }

    async initialize(district: DistrictObj) {
        await this.districtActivator.initialize(district);
    }

    async activate(district: DistrictObj) {
        await this.districtActivator.activate(district);
    }

    deactivate() {
        const activeDistrict = this.world.districtStore.getActiveDistrict();
        this.districtActivator.deactivate(activeDistrict);
    }
}