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

        districts.forEach(district => this.world.district.initialize(district));
        await this.world.district.activate(districts[0]);
        this._isLoaded = true;
    }

    async loadDistrict(id: string) {
        const newDistrict = this.world.districtStore.getDistrict(id);
        await this.world.district.activate(newDistrict);
    }
}