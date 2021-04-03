import { QuarterUpdater } from "./QuarterUpdater";
import { World } from "../World";


export class UpdateService {

    private quarterUpdater: QuarterUpdater;

    constructor(world: World) {
        this.quarterUpdater = new QuarterUpdater(world);
    }

    update() {
        this.quarterUpdater.updateQuarterBasedOnPlayerPosition();
    }
}