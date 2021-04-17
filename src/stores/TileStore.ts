import { Vector2 } from "babylonjs";
import { TileObj } from "../model/general/objs/TileObj";

type GraphMap = Map<TileObj, { cost: number, neighbour: TileObj }[]>;

export class TileStore {
    readonly TILE_SIZE = 4;
    TILES_PER_ROW: number;
    TILES_PER_COL: number;

    private tileMap: {[key: number]: TileObj} = {}
    private tileList: TileObj[] = [];
    private tileGraph: Map<TileObj, number[]> = new Map();

    add(tile: TileObj) {
        this.tileMap[tile.index] = tile;
        this.tileList.push(tile);
        const leftIndex = tile.index - 1;
        const rightIndex = tile.index + 1;
        const topIndex = tile.index - this.TILES_PER_ROW;
        const bottomIndex = tile.index + this.TILES_PER_ROW;
    
        this.tileGraph.set(tile, [topIndex, rightIndex, bottomIndex, leftIndex]);
    }

    setTiles(tiles: TileObj[]) {

    }

    clearTiles(): void {
        this.tileGraph = new Map();
    }

    remove(tile: TileObj) {
        this.tileMap[tile.index] = undefined;
        this.tileList = this.tileList.filter(t => t !== tile);
        this.tileGraph.delete(tile);
    }

    getNeighbourTiles(tile: TileObj): TileObj[] {
        const neighbourIndexes = this.tileGraph.get(tile);
        return neighbourIndexes.map(index => this.tileMap[index]).filter(tile => tile !== undefined);
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
}

function createGraph(tiles: TileObj[]): GraphMap {
    const indexMap: Map<number, TileObj> = new Map();
    tiles.forEach(tile => indexMap.set(tile.index, tile));

    const graphMap: GraphMap = new Map();
    tiles.forEach(tile => {

        
    });
}

export class TileDepthFirstSearch {
    iterate(startTile: TileObj,  store: TileStore, maxDepth: number, callback: (tile: TileObj) => void) {
        const stack: [TileObj, number][] = [];
        const visited: Set<TileObj> = new Set();
        
        stack.push([startTile, 0]);

        while (stack.length > 0) {
            const [tile, tileDepth] = stack.pop();
            
            if (!visited.has(tile)) {
                visited.add(tile);
                
                if (tileDepth <= maxDepth) {
                    callback(tile);
    
                    const neightbourTiles = store.getNeighbourTiles(tile);
                    neightbourTiles.forEach(tile => stack.push([tile, tileDepth + 1]));
                }
                
            }
        }
    }
}