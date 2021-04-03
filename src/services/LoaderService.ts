import { DistrictObj } from "../model/objs/DistrictObj";
import { World } from "./World";

export class LoaderService {
    private world: World;
    private _isLoaded = false;

    constructor(world: World) {
        this.world = world;
    }

    isLoaded() {
        return this._isLoaded;
    }

    async loadGame() {
        await this.world.jsonStore.loadDistricts();

        const districtIds = this.world.jsonStore.getDistrictIds();
    
        const districts = districtIds.map(id => new DistrictObj(this.world.jsonStore.getJson(id), this.world));
        this.world.districtStore.setDistricts(districts);

        districts.forEach(district => district.activatorComp.initialize());
        await districts[0].activatorComp.activate();
        this._isLoaded = true;
    }

    async loadDistrict(id: string) {
        await this.world.districtStore.getDistrict(id).activatorComp.activate();
    }
}