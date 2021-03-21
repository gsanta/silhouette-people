import { DistrictObj } from "../model/objs/DistrictObj";
import { GameObj, GameObjectRole } from "../model/objs/GameObj";
import { QuarterObj } from "../model/objs/QuarterObj";

export class WorldStore {
    private districtsMap: Map<string, DistrictObj> = new Map();
    private districts: DistrictObj[] = [];

    setDistricts(districts: DistrictObj[]) {
        districts.forEach(district => this.districtsMap.set(district.id, district));
        this.districts = districts;
    }

    getDistrict(id: string): DistrictObj {
        return this.districtsMap.get(id);
    }

    getActiveDistrict(): DistrictObj {
        return this.districts.find(district => district.activeComp !== undefined);
    }

    getQuarter(index: number): QuarterObj {
        return this.getActiveDistrict().activeComp.getQuarter(index);
    }

    getAllGameObjects(): GameObj[] {
        return this.getActiveDistrict().activeComp.getAllGameObjects();
    }

    getGameObjectByRole(role: GameObjectRole): GameObj[] {
        return this.getActiveDistrict().activeComp.getGameObjectByRole(role);
    } 
}