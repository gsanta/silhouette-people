import { constants } from "../../contants";
import { InjectProperty } from "../../di/diDecorators";
import { TileFactory } from "../../services/factory/TileFactory";
import { lookup } from "../../services/Lookup";
import { QuarterObj } from "./QuarterObj";

export class TilingComponent {
    readonly TILES_PER_QUARTER_X: number;
    readonly TILES_PER_QUARTER_Y: number;
    private quarterObj: QuarterObj;
    private isActive = false;

    @InjectProperty("TileFactory")
    private tileFactory: TileFactory;

    constructor(quarterObj: QuarterObj) {
        this.tileFactory = lookup.tileFactory;
        this.quarterObj = quarterObj;
        
        this.TILES_PER_QUARTER_X = Math.floor(quarterObj.getSize().x / constants.TILE_SIZE);
        this.TILES_PER_QUARTER_Y = Math.floor(quarterObj.getSize().y / constants.TILE_SIZE);
    }

    activate() {
        if (!this.isActive) {
            this.isActive = true;
            this.tileFactory.createTilesForQuarter(this.quarterObj);
        }
    }

    deactivate() {

    }
}