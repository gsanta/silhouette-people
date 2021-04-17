import { Vector2 } from "babylonjs";
import { TileObj } from "../model/general/objs/TileObj";
import { Rect } from "../model/general/shape/Rect";
import { Graph } from "../model/graph/Graph";

type WeightedNeighbour = [TileObj, number];
type GraphMap = Map<TileObj, WeightedNeighbour[]>;

export class TileStore implements Graph<TileObj, [TileObj, number, TileObj]> {
    readonly TILE_SIZE = 4;
    TILES_PER_ROW: number;
    TILES_PER_COL: number;

    private bounds: Rect;
    private tiles: TileObj[][];
    private graphMap: GraphMap = new Map();

    setTiles(tiles: TileObj[][], bounds: Rect) {
        this.tiles = tiles;
        this.graphMap = createGraph(tiles);
        this.bounds = bounds;
    }

    clearTiles(): void {
        Array.from(this.graphMap.keys()).forEach(tile => tile.dispose())
        this.graphMap = new Map();
    }

    vertices(): TileObj[] {
        return Array.from(this.graphMap.keys());
    }

    edgeBetween(v1: TileObj, v2: TileObj): [TileObj, number, TileObj] {
        const neighbour = this.graphMap.get(v1).find(n => n[0] === v2);

        if (neighbour) {
            return [...neighbour, v1];
        }
    }

    neighbours(v: TileObj): TileObj[] {
        return this.graphMap.get(v).map(neighbour => neighbour[0]);
    }

    getAll(): TileObj[] {
        return Array.from(this.graphMap.keys());
    }

    getTileByWorldPos(position: Vector2): TileObj {
        if (this.bounds.containsPoint(position)) {
            const tileRows = Math.floor(this.bounds.getHeight() / this.TILE_SIZE);
            const relativeX = position.x - this.bounds.min.x;
            const relativeY = position.y - this.bounds.min.y;
            const tileX = Math.floor(relativeX / this.TILE_SIZE);
            const tileY =  tileRows - Math.floor(relativeY / this.TILE_SIZE) - 1;
            return this.tiles[tileY][tileX];
        }
    }
}

function createGraph(tiles: TileObj[][]): GraphMap {
    const rows = tiles.length;
    const cols = tiles[0].length;

    const graphMap: GraphMap = new Map();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = tiles[row][col];
            const neighbours: WeightedNeighbour[] = [];

            if (row > 0) {
                neighbours.push([tiles[row - 1][col], 1]);
            }

            if (col < cols - 1) {
                neighbours.push([tiles[row][col + 1], 1]);
            }

            if (col > 0) {
                neighbours.push([tiles[row][col - 1], 1]);
            }

            if (row < rows - 1) {
                neighbours.push([tiles[row + 1][col], 1]);
            }

            graphMap.set(tile, neighbours);
        }
    }

    return graphMap;
}
