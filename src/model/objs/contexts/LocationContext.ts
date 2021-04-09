import { WorldObj } from "../WorldObj";
import { QuarterObj } from "../QuarterObj";

export class LocationContext {
    private district: WorldObj;
    private quarter: QuarterObj;

    setDistrict(district: WorldObj) {
        this.district = district;
    }

    setQuarter(quarter: QuarterObj) {
        this.quarter = quarter;
    }

    getDistrict(): WorldObj {
        return this.district;
    }

    getQuarter(): QuarterObj {
        return this.quarter;
    }
}