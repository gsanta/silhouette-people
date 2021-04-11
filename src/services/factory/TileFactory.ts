import { Axis, Color4, MeshBuilder, Space, Vector3 } from "babylonjs";
import { constants } from "../../contants";
import { InjectProperty } from "../../di/diDecorators";
import { QuarterObj } from "../../model/objs/QuarterObj";
import { TileObj } from "../../model/objs/TileObj";
import { TileStore } from "../../stores/TileStore";
import { WorldProvider } from "../WorldProvider";
import { lookup } from "../Lookup";

export class TileFactory {

    @InjectProperty("TileStore")
    private tileStore: TileStore;

    @InjectProperty("WorldProvier")
    private worldProvider: WorldProvider;

    constructor() {
        this.tileStore = lookup.tileStore;
        this.worldProvider = lookup.worldProvider;
    }

    createTilesForQuarter(quarterObj: QuarterObj) {
        const tileMaterial = this.tileStore.getTileMaterial();
        const tileSize = 4;
        const center = quarterObj.getPosition2D();
        const [width, height] = [quarterObj.getSize().x, quarterObj.getSize().y];
        const [tileCols, tileRows] = [width / tileSize, height / tileSize];

        const quarterPosition = quarterObj.getQuarterPosition();
        const top = quarterPosition.y * quarterObj.tiles.TILES_PER_QUARTER_Y;
        const left = quarterPosition.x * quarterObj.tiles.TILES_PER_QUARTER_X;
        const tilesPerRow = Math.floor(this.worldProvider.world.size.x / constants.TILE_SIZE);

        for (let xInd = 0; xInd < tileCols; xInd++) {
            for (let yInd = 0; yInd < tileRows; yInd++) {
                const xRelPos = xInd - tileCols / 2;
                const yRelPos = tileRows / 2 - yInd;
                const xWorldPos = xRelPos * tileSize + center.x + tileSize / 2;
                const yWorldPos = yRelPos * tileSize + center.y + tileSize / 2;

                const id = `${quarterObj.id}-${xInd}-${yInd}`;

                const ground = MeshBuilder.CreateGround(id, { width: tileSize, height: tileSize });
                ground.translate(new Vector3(xWorldPos, 0, yWorldPos), 1, Space.WORLD);
                ground.material = tileMaterial;
                ground.translate(Axis.Y, 0.3, Space.WORLD);
                ground.enableEdgesRendering();
                ground.edgesWidth = 5.0;
                ground.edgesColor = new Color4(0, 0, 1, 1);

                this.tileStore.add(new TileObj(ground, (yInd + top) * tilesPerRow + left));
            }
        }
    }
}