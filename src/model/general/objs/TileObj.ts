import { Mesh } from "babylonjs";
import { InjectProperty } from "../../../di/diDecorators";
import { lookup } from "../../../services/Lookup";
import { TileStore } from "../../../stores/TileStore";

export class TileObj {
    private mesh: Mesh;
    index: number;

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    private isActive = false;
    private isHovered = false;

    constructor(mesh: Mesh, index: number) {
        this.tileStore = lookup.tileStore;
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

    private updateMaterial() {
        if (this.isActive) {
            this.mesh.material = this.tileStore.getActiveTileMaterial();
        } else if (this.isHovered) {
            this.mesh.material = this.tileStore.getHoverTileMaterial();
        } else {
            this.mesh.material = this.tileStore.getTileMaterial();
        }
    }
}