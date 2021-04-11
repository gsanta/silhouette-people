import { QuarterObj } from "../model/objs/QuarterObj";
import { IQuarterStore } from "./IQuarterStore";

export class QuarterStore implements IQuarterStore {
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