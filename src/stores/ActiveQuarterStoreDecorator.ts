import { QuarterObj } from "../model/objs/QuarterObj";
import { Lookup } from "../services/Lookup";
import { IQuarterStore } from "./IQuarterStore";

export class ActiveQuarterStoreDecorator implements IQuarterStore {
    private world: Lookup;

    constructor(world: Lookup) {
        this.world = world;
    }

    // TODO: possibly should be removed from here and from IQuarterStore interface also
    addQuarter(quarterObj: QuarterObj) {
        this.getActiveQuarterStore().addQuarter(quarterObj);
    }

    getQuarter(index: number): QuarterObj {
        return this.getActiveQuarterStore().getQuarter(index);
    }

    getAllQuarters(): QuarterObj[] {
        return this.getActiveQuarterStore().getAllQuarters();
    }

    dispose() {
        this.getActiveQuarterStore().dispose();
    }

    private getActiveQuarterStore() {
        return this.world.worldProvider.world.quarter;
    }
}