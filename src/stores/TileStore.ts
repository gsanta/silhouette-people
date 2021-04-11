import { Color3, StandardMaterial, Vector2 } from "babylonjs";
import { InjectProperty } from "../di/diDecorators";
import { TileObj } from "../model/objs/TileObj";
import { lookup } from "../services/Lookup";
import { WorldProvider } from "./WorldProvider";

export class TileStore {
    readonly TILE_SIZE = 4;
    
    private tileMaterial: StandardMaterial; 
    private activeTileMaterial: StandardMaterial; 
    private tiles: {[key: number]: TileObj} = {}

    @InjectProperty("WorldProvider")
    private worldProvider: WorldProvider;

    constructor() {
        this.worldProvider = lookup.worldProvider;
    }

    add(tile: TileObj) {
        this.tiles[tile.index] = tile;
    }

    getTileByWorldPos(position: Vector2): TileObj {
        const { world } = this.worldProvider;
        const sizeX = world.size.x;
        const sizeY = world.size.y;
        const x = Math.trunc((position.x + sizeX / 2) / this.TILE_SIZE);
        const y = Math.trunc((position.y + sizeY / 2) / this.TILE_SIZE);
        const index = y * (sizeX / this.TILE_SIZE) + x;
        return this.tiles[index];
    }

    getTileMaterial(): StandardMaterial {
        if (!this.tileMaterial) {

            this.tileMaterial = new StandardMaterial('tile-material', this.worldProvider.world.scene);
            this.tileMaterial.alpha = 0;
        }

        return this.tileMaterial;
    }

    getActiveTileMaterial(): StandardMaterial {
        if (!this.activeTileMaterial) { 

            this.activeTileMaterial = new StandardMaterial('tile-material-active', this.worldProvider.world.scene);
            this.activeTileMaterial.diffuseColor = Color3.Green();
            this.tileMaterial.alpha = 0.5;
        }

        return this.activeTileMaterial;
    }
}