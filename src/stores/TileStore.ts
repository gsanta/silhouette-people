import { Color3, StandardMaterial, Vector2 } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { TileObj } from "../model/objs/TileObj";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "../services/WorldProvider";

export class TileStore {
    readonly TILE_SIZE = 4;
    TILES_PER_ROW: number;
    TILES_PER_COL: number;
    TILES_PER_QUARTER_ROW: number;
    TILES_PER_QUARTER_COL: number;
    
    private tileMaterial: StandardMaterial; 
    private activeTileMaterial: StandardMaterial; 
    private hoverTileMaterial: StandardMaterial;
    private tileMap: {[key: number]: TileObj} = {}
    private tileList: TileObj[] = [];

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    add(tile: TileObj) {
        this.tileMap[tile.index] = tile;
        this.tileList.push(tile);
    }

    getAll(): TileObj[] {
        return this.tileList;
    }

    getTileByWorldPos(position: Vector2): TileObj {
        const x = Math.floor(position.x / this.TILE_SIZE) + this.TILES_PER_ROW / 2;
        const y = this.TILES_PER_COL / 2 - Math.floor(position.y / this.TILE_SIZE) - 1;
        const index = y * this.TILES_PER_ROW + x;
        return this.tileMap[index];
    }

    getTileMaterial(): StandardMaterial {
        if (!this.tileMaterial) {

            this.tileMaterial = new StandardMaterial('tile-material-default', this.worldProvider.world.scene);
            this.tileMaterial.alpha = 0;
        }

        return this.tileMaterial;
    }

    getActiveTileMaterial(): StandardMaterial {
        if (!this.activeTileMaterial) { 

            this.activeTileMaterial = new StandardMaterial('tile-material-active', this.worldProvider.world.scene);
            this.activeTileMaterial.diffuseColor = Color3.Green();
            this.activeTileMaterial.alpha = 0.5;
        }

        return this.activeTileMaterial;
    }

    getHoverTileMaterial(): StandardMaterial {
        if (!this.hoverTileMaterial) { 

            this.hoverTileMaterial = new StandardMaterial('tile-material-hover', this.worldProvider.world.scene);
            this.hoverTileMaterial.diffuseColor = Color3.Green();
            this.hoverTileMaterial.alpha = 0.2;
        }

        return this.hoverTileMaterial;
    }
}