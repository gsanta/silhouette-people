import { QuarterObj } from "../model/objs/QuarterObj";
import { World } from "../services/World";
import { IQuarterStore } from "./IQuarterStore";

export class ActiveQuarterStoreDecorator implements IQuarterStore {
    private world: World;

    constructor(world: World) {
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

    private getActiveQuarterStore() {
        return this.world.districtStore.getActiveDistrict().quarter;
    }
}