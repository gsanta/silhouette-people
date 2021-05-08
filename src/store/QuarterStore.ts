import { QuarterItem } from "../model/item/quarter/QuarterItem";

export class QuarterStore {
    private quarters: QuarterItem[] = [];

    addQuarter(quarterObj: QuarterItem) {
        quarterObj.index = this.quarters.length;
        this.quarters.push(quarterObj);
    }

    getQuarter(index: number): QuarterItem {
        return this.quarters[index];
    }

    getAllQuarters(): QuarterItem[] {
        return this.quarters;
    }

    dispose() {
        this.quarters = [];
    }
}