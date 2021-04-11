import { Mesh } from "babylonjs";
import { InjectProperty } from "../../di/diDecorators";
import { lookup } from "../../services/Lookup";
import { TileStore } from "../../stores/TileStore";

export class TileObj {
    private mesh: Mesh;
    index: number;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    constructor(mesh: Mesh, index: number) {
        this.tileStore = lookup.tileStore;
        this.mesh = mesh;
        this.index = index;
    }

    markActive() {
        this.mesh.material = this.tileStore.getActiveTileMaterial();
    }

    unMarkActive() {
        this.mesh.material = this.tileStore.getTileMaterial();
    }
}