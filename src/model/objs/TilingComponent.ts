import { Lookup } from "../../services/Lookup";
import { QuarterObj } from "./QuarterObj";

export class TilingComponent {
    private quarterObj: QuarterObj;
    private lookup: Lookup;
    private isActive = false;

    constructor(quarterObj: QuarterObj, lookup: Lookup) {
        this.quarterObj = quarterObj;
        this.lookup = lookup;
    }

    activate() {
        if (!this.isActive) {
            this.isActive = true;
            this.lookup.quarterFactory.createTiles(this.quarterObj);
        }
    }

    deactivate() {

    }
}