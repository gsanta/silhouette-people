import { DistrictObj } from "../model/objs/DistrictObj";

export class WorldStore {
    private districts: Map<string, DistrictObj> = new Map();
    private activeDistrict: DistrictObj;


    addDistrict(district: DistrictObj) {
        this.districts.set(district.id, district);
    }

    getDistrict(id: string): DistrictObj {
        return this.districts.get(id);
    }

    setActiveDistrict(district: DistrictObj) {
        this.activeDistrict = district;
    }

    getActiveDistrict(): DistrictObj {
        return this.activeDistrict;
    }
}