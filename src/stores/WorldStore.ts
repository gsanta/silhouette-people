import { DistrictStore } from "./DistrictStore";

export class WorldStore {
    private districts: Map<string, DistrictStore> = new Map();


    addDistrict(district: DistrictStore) {
        this.districts.set(district.id, district);
    }

    getDistrict(id: string): DistrictStore {
        return this.districts.get(id);
    }
}