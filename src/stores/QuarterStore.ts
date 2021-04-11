import { QuarterObj } from "../model/objs/QuarterObj";

export class QuarterStore {
    private quarters: QuarterObj[] = [];

    addQuarter(quarterObj: QuarterObj) {
        quarterObj.index = this.quarters.length;
        this.quarters.push(quarterObj);
    }

    getQuarter(index: number): QuarterObj {
        return this.quarters[index];
    }

    getAllQuarters(): QuarterObj[] {
        return this.quarters;
    }

    dispose() {
        this.quarters = [];
    }
}