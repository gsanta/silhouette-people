import { QuarterUpdater } from "./QuarterUpdater";


export class UpdateService {

    private quarterUpdater: QuarterUpdater;

    constructor() {
        this.quarterUpdater = new QuarterUpdater();
    }

    update() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();
    }
}