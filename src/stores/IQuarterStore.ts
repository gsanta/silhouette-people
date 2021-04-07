import { QuarterObj } from "../model/objs/QuarterObj";

export interface IQuarterStore {
    addQuarter(quarterObj: QuarterObj);

    getQuarter(index: number): QuarterObj;

    getAllQuarters(): QuarterObj[];

    dispose(): void;
}