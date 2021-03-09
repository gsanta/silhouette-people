import { Mesh, Vector2, Vector3 } from "babylonjs";
import { World } from "../../model/World";
import { AreaMapFiller } from "./AreaMapFiller";
import { AreaMapVisualizer, AreaVisualizerConfig } from "./AreaMapVisualizer";

export class AreaMap {
    readonly topLeft: Vector2;
    readonly botRight: Vector2;
    private readonly offsetX: number;
    private readonly offsetY: number;

    readonly columns: number;
    readonly rows: number;
    readonly gridSize: number;

    private map: number[] = [];

    constructor(topLeft: Vector2, botRight: Vector2, gridSize: number) {
        this.topLeft = topLeft;
        this.botRight = botRight;
        this.gridSize = gridSize;

        this.columns = this.botRight.x - this.topLeft.x;
        this.rows = this.botRight.y - this.topLeft.y;

        this.init;
    }

    block(index: number) {
        this.map[index] = 1;
    }

    blockRect(min: Vector3, max: Vector3) {
        const xNum = Math.ceil((max.x - min.x) / this.gridSize);
        const yNum = Math.ceil((max.z - min.z) / this.gridSize);
        const topLeftIndex = this.getIndexAtWorldCoordinate(new Vector2(min.x, min.z));
        const [tlX, tlY] = this.getGridCoordinate(topLeftIndex);
        debugger;
        for (let i = tlY; i < tlY + yNum; i++) {
            for (let j = tlX; j < tlX + xNum; j++) {
                this.block(this.getIndexAtGridCoordinate(i, j));
            }
        }
        // let [min2, max2] = this.getBoundedRect(min, max);

        // const minGridX = min.x 
    }

    private getBoundedRect(min: Vector3, max: Vector3): [Vector2, Vector2] {
        const min2 = this.offsetPoint(min);
        const max2 = this.offsetPoint(max);

        if (min2.x < this.topLeft.x) {
            min2.x = this.topLeft.x;
        }

        if (min2.y < this.topLeft.y) {
            min2.y = this.topLeft.y;
        }

        if (max2.x > this.botRight.x) {
            max2.x = this.botRight.x;
        }

        if (max2.y > this.botRight.y) {
            max2.y = this.botRight.y;
        }

        return [min2, max2];
    }

    private offsetPoint(point: Vector3): Vector2 {
        return new Vector2(point.x - this.topLeft.x, point.y - this.topLeft.y);
    }

    setEmpty(row: number, column: number) {
        this.map[row][column] = 0;
    }

    isBlocked(index: number) {
        return this.map[index] === 1;
    }

    getIndexAtGridCoordinate(x: number, y: number) {
        return y * this.rows + x;
    }

    getIndexAtWorldCoordinate(coordinate: Vector2): number {
        const col = Math.floor((coordinate.x - this.topLeft.x) / this.gridSize);
        const row = Math.floor((coordinate.y - this.topLeft.y) / this.gridSize);

        return row * this.rows + col;
    }

    getGridCoordinate(index: number): [number, number] {
        return [Math.floor(index / this.columns), index % this.columns];
    }

    getWorldCoordinate(index: number) {
        const [row, col] = this.getGridCoordinate(index);
        const x = this.topLeft.x + col * this.gridSize + this.gridSize / 2;
        const y = this.topLeft.y + row * this.gridSize + this.gridSize / 2;
        return new Vector2(x, y);
    }

    visualize(config: AreaVisualizerConfig, world: World) {
        new AreaMapVisualizer(world).visualize(config, this);
    }

    fill(meshes: Mesh[]) {
        new AreaMapFiller().fill(this, meshes);
    }

    private init() {
        this.map = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const index = this.getIndexAtGridCoordinate(j, i)
                this.map[index] = 0;
            }
        }
    }
}