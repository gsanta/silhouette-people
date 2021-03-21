import { QuarterMap } from "../district/QuarterMap";
import { GameObj } from "./GameObj";
import { DistrictObj } from "./DistrictObj";

export class QuarterObj {
    private map: QuarterMap;
    private district: DistrictObj;

    constructor(district: DistrictObj) {
        this.district = district;
    }

    getAllGameObjects(): GameObj[] {
        return this.district.activeComp.getAllGameObjects().filter(obj => obj.location.getQuarter() === this);
    }

    getMap() {
        return this.map;
    }

    setMap(map: QuarterMap) {
        this.map = map;
    }
}