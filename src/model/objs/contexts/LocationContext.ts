import { DistrictObj } from "../DistrictObj";
import { QuarterObj } from "../QuarterObj";

export class LocationContext {
    private district: DistrictObj;
    private quarter: QuarterObj;

    setDistrict(district: DistrictObj) {
        this.district = district;
    }

    setQuarter(quarter: QuarterObj) {
        this.quarter = quarter;
    }

    getDistrict(): DistrictObj {
        return this.district;
    }

    getQuarter(): QuarterObj {
        return this.quarter;
    }
}