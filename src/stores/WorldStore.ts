import { District } from "./District";

export class WorldStore {
    private districts: Map<string, District> = new Map();
    private activeDistrict: District;


    addDistrict(district: District) {
        this.districts.set(district.id, district);
    }

    getDistrict(id: string): District {
        return this.districts.get(id);
    }

    setActiveDistrict(district: District) {
        this.activeDistrict = district;
    }

    getActiveDistrict(): District {
        return this.activeDistrict;
    }
}