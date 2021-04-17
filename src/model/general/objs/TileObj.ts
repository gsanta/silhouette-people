import { Mesh } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { MaterialStore } from "../../../stores/MaterialStore";
import { TileStore } from "../../../stores/TileStore";

export class TileObj {
    private mesh: Mesh;
    index: number;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("TileStore")
    private materialStore: MaterialStore;

    private isActive = false;
    private isHovered = false;

    constructor(mesh: Mesh, index: number) {
        this.tileStore = lookup.tileStore;
        this.materialStore = lookup.materialStore;
        this.mesh = mesh;
        this.index = index;
    }

    markActive() {
        if (!this.isActive) {
            this.isActive = true;
            this.updateMaterial();
        }
    }

    unMarkActive() {
        if (this.isActive) {
            this.isActive = false;
            this.updateMaterial();
        }
    }

    markHover() {
        if (!this.isHovered) {
            this.isHovered = true;
            this.updateMaterial();
        }
    }

    unMarkHover() {
        if (this.isHovered) {
            this.isHovered = false;
            this.updateMaterial();
        }
    }

    dispose() {
        this.mesh.dispose();
    }

    private updateMaterial() {
        if (this.isActive) {
            this.mesh.material = this.materialStore.getActiveTileMaterial();
        } else if (this.isHovered) {
            this.mesh.material = this.materialStore.getHoverTileMaterial();
        } else {
            this.mesh.material = this.materialStore.getTileMaterial();
        }
    }
}