import { Axis, Color4, MeshBuilder, Space, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { InjectProperty } from "../../di/diDecorators";
import { TileObj } from "../../model/general/objs/TileObj";
import { Rect } from "../../model/general/shape/Rect";
import { TileStore } from "../../stores/TileStore";
import { lookup } from "../Lookup";

export class TileFactory {

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    private readonly tileSize = 4;

    constructor() {
        this.tileStore = lookup.tileStore;
    }

    createTilesForArea(area: Rect) {

        const center = area.center();
        const width = area.getWidth();
        const height = area.getHeight();

        const [cols, rows] = [width / this.tileSize, height / this.tileSize];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.createTile(center, cols, rows, col, row);
            }
        }
    }

    private createTile(center: Vector2, cols: number, rows: number, col: number, row: number) {
        const tileMaterial = this.tileStore.getTileMaterial();

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

        this.tileStore.add(new TileObj(ground, index));
    }
}