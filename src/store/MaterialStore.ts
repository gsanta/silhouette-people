import { Color3, StandardMaterial } from "babylonjs";
import { WorldProvider } from "../service/WorldProvider";

export class MaterialStore {
    private tileMaterial: StandardMaterial; 
    private activeTileMaterial: StandardMaterial; 
    private hoverTileMaterial: StandardMaterial;
    private ribbonMaterial: StandardMaterial;
    private activePathMaterial: StandardMaterial;

    private readonly worldProvider: WorldProvider;

    constructor(worldProvider: WorldProvider) {
        this.worldProvider = worldProvider;
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
            mat.alpha = 0.5;
            mat.diffuseColor = Color3.Green();
            mat.emissiveColor = Color3.Black();
            mat.backFaceCulling = false;
            this.ribbonMaterial = mat;
        }

        return this.ribbonMaterial;
    }

    getActivePathMaterial() {
        if (!this.activePathMaterial) {
            var mat = new StandardMaterial("active-path-material", this.worldProvider.scene);
            mat.alpha = 1;
            mat.diffuseColor = Color3.Blue();
            mat.emissiveColor = Color3.Black();
            mat.backFaceCulling = false;
            this.ribbonMaterial = mat;
        }

        return this.ribbonMaterial;
    }
}