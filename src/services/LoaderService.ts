import { DistrictObj } from "../model/objs/DistrictObj";
import { World } from "./World";

export class LoaderService {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    async loadGame() {
        await this.world.jsonStore.loadDistricts();

        const districtIds = this.world.jsonStore.getDistrictIds();
    
        const districts = districtIds.map(id => new DistrictObj(this.world.jsonStore.getJson(id), this.world));
        this.world.store.setDistricts(districts);

        districts.forEach(district => district.activatorComp.initialize());
        await districts[0].activatorComp.activate();
    }
}