import { Color3, StandardMaterial } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { lookup } from "../service/Lookup";
import { WorldProvider } from "../service/object/world/WorldProvider";

export class MaterialStore {
    private tileMaterial: StandardMaterial; 
    private activeTileMaterial: StandardMaterial; 
    private hoverTileMaterial: StandardMaterial;
    private ribbonMaterial: StandardMaterial;

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    getTileMaterial(): StandardMaterial {
        if (!this.tileMaterial) {

            this.tileMaterial = new StandardMaterial('tile-material-default', this.worldProvider.scene);
            this.tileMaterial.alpha = 0;
        }

        return this.tileMaterial;
    }

    getActiveTileMaterial(): StandardMaterial {
        if (!this.activeTileMaterial) { 

            this.activeTileMaterial = new StandardMaterial('tile-material-active', this.worldProvider.scene);
            this.activeTileMaterial.diffuseColor = Color3.Green();
            this.activeTileMaterial.alpha = 0.5;
        }

        return this.activeTileMaterial;
    }

    getHoverTileMaterial(): StandardMaterial {
        if (!this.hoverTileMaterial) { 

            this.hoverTileMaterial = new StandardMaterial('tile-material-hover', this.worldProvider.scene);
            this.hoverTileMaterial.diffuseColor = Color3.Green();
            this.hoverTileMaterial.alpha = 0.2;
        }

        return this.hoverTileMaterial;
    }

    getRibbonMaterial(): StandardMaterial {
        if (!this.ribbonMaterial) {
            var mat = new StandardMaterial("mat1", this.worldProvider.scene);
            mat.alpha = 1;
            mat.diffuseColor = new Color3(0.5, 0.5, 1.0);
            mat.emissiveColor = Color3.Black();
            mat.backFaceCulling = false;
            this.ribbonMaterial = mat;
        }

        return this.ribbonMaterial;
    }
}