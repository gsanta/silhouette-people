import { Axis, Color4, MeshBuilder, Space, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../../di/diDecorators";
import { TileObj } from "../../model/general/objs/TileObj";
import { Rect } from "../../model/general/shape/Rect";
import { MaterialStore } from "../../stores/MaterialStore";
import { TileStore } from "../../stores/TileStore";
import { lookup } from "../Lookup";

export class TileFactory {

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("MaterialStore")
    private materialStore: MaterialStore;

    private readonly tileSize = 4;

    constructor() {
        this.tileStore = lookup.tileStore;
        this.materialStore = lookup.materialStore;
    }

    createTilesForArea(bounds: Rect) {

        const center = bounds.center();
        const width = bounds.getWidth();
        const height = bounds.getHeight();

        const [cols, rows] = [width / this.tileSize, height / this.tileSize];

        const tiles: TileObj[][] = [];

        for (let row = 0; row < rows; row++) {
            tiles.push([]);
            for (let col = 0; col < cols; col++) {
                const tile = this.createTile(center, cols, rows, col, row);
                tiles[row].push(tile);
            }
        }

        this.tileStore.setTiles(tiles, bounds);
    }

    private createTile(center: Vector2, cols: number, rows: number, col: number, row: number): TileObj {
        const tileMaterial = this.materialStore.getTileMaterial();

        const relativeColPos = col - cols / 2;
        const relativeRowPos = rows / 2 - row;

        const xWorld = relativeColPos * this.tileSize + center.x + this.tileSize / 2;
        const yWorld = relativeRowPos * this.tileSize + center.y - this.tileSize / 2;

        const index = row * cols + col;
        const id = `${index}-${col}-${row}`;

        const ground = MeshBuilder.CreateGround(id, { width: this.tileSize, height: this.tileSize });
        ground.translate(new Vector3(xWorld, 0, yWorld), 1, Space.WORLD);
        ground.material = tileMaterial;
        ground.translate(Axis.Y, 0.3, Space.WORLD);
        ground.enableEdgesRendering();
        ground.edgesWidth = 5.0;
        ground.edgesColor = new Color4(0, 0, 1, 1);

        return new TileObj(ground, index);
    }
}