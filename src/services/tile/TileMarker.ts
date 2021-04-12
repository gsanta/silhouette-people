import { Vector2 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../../di/diDecorators";
import { TileStore } from "../../stores/TileStore";
import { lookup } from "../Lookup";

export class TileMarker {

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    constructor() {
        this.tileStore = lookup.tileStore;
    }

    markActive(pos: Vector2) {
        const tile = this.tileStore.getTileByWorldPos(pos);
        if (tile) {
            tile.markActive();
        }
    }

    unmarkActive(pos: Vector2) {
        const tile = this.tileStore.getTileByWorldPos(pos);
        if (tile) {
            tile.unMarkActive();
        }
    }

    markHover(pos: Vector2) {
        const tile = this.tileStore.getTileByWorldPos(pos);
        if (tile) {
            tile.markHover();
        }
    }

    unmarkHoverAll() {
        this.tileStore.getAll().forEach(tile => tile.unMarkHover());
    }
}