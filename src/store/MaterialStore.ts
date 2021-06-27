import { Color3, Material, StandardMaterial } from "babylonjs";
import { SceneService } from "../service/SceneService";

export enum MaterialName {
    TERRAIN_1 = 'material-terrain-1',
    ROUTE_EDGE_HOVERED = 'material-route-edge-hovered',
    ROUTE_EDGE_SELECTED = 'material-route-edge-selected'
}

export class MaterialStore {
    private tileMaterial: StandardMaterial; 
    private activeTileMaterial: StandardMaterial; 
    private hoverTileMaterial: StandardMaterial;
    private ribbonMaterial: StandardMaterial;
    private activePathMaterial: StandardMaterial;
    private materials: Map<string, Material> = new Map();

    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        this.worldProvider = worldProvider;
    }

    addMaterial(id: MaterialName, material: Material) {
        this.materials.set(id, material);
    }

    getMaterialByName(id: string): Material {
        return this.materials.get(id);
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

    getPathMaterial(): StandardMaterial {
        if (!this.ribbonMaterial) {
            var mat = new StandardMaterial("mat1", this.worldProvider.scene);
            mat.alpha = 0.2;
            mat.diffuseColor = Color3.Red();
            mat.emissiveColor = Color3.Black();
            mat.backFaceCulling = false;
            this.ribbonMaterial = mat;
        }

        return this.ribbonMaterial;
    }

    getActivePathMaterial(): StandardMaterial {
        if (!this.activePathMaterial) {
            var mat = new StandardMaterial("mat1", this.worldProvider.scene);
            mat.alpha = 1;
            mat.diffuseColor = Color3.Red();
            mat.emissiveColor = Color3.Black();
            mat.backFaceCulling = false;
            this.ribbonMaterial = mat;
        }

        return this.ribbonMaterial;
    }
}