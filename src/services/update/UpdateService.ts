import { QuarterUpdater } from "./QuarterUpdater";
import { Lookup } from "../Lookup";


export class UpdateService {

    private quarterUpdater: QuarterUpdater;

    constructor(world: Lookup) {
        this.quarterUpdater = new QuarterUpdater(world);
    }

    update() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();
    }
}