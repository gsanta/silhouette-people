import { Mesh, Vector2, Vector3 } from "babylonjs";
import { World } from "../../model/World";
import { AreaMapFiller } from "./AreaMapFiller";
import { AreaMapVisualizer, AreaVisualizerConfig } from "./AreaMapVisualizer";

export class AreaMap {
    readonly topLeft: Vector2;
    readonly botRight: Vector2;

    readonly columns: number;
    readonly rows: number;
    readonly gridSize: number;

    private map: number[] = [];

    constructor(topLeft: Vector2, botRight: Vector2, gridSize: number) {
        this.topLeft = topLeft;
        this.botRight = botRight;
        this.gridSize = gridSize;

        this.columns = (this.botRight.x - this.topLeft.x) / gridSize;
        this.rows = (this.botRight.y - this.topLeft.y) / gridSize;
    }

    block(index: number) {
        this.map[index] = 1;
    }

    blockRect(min: Vector3, max: Vector3) {
        const xNum = Math.ceil((max.x - min.x) / this.gridSize);
        const yNum = Math.ceil((max.z - min.z) / this.gridSize);
        const topLeftIndex = this.getIndexAtWorldCoordinate(new Vector2(min.x, min.z));
        const [tlX, tlY] = this.getGridCoordinate(topLeftIndex);

        for (let i = tlY; i <= tlY + yNum; i++) {
            for (let j = tlX; j <= tlX + xNum; j++) {
                this.block(this.getIndexAtGridCoordinate(i, j));
            }
        }
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
        let col = Math.floor((coordinate.x - this.topLeft.x) / this.gridSize);
        col = col < 0 ? 0 : col >= this.columns ? this.columns - 1 : col;

        let row = Math.floor((coordinate.y - this.topLeft.y) / this.gridSize);
        row = row < 0 ? 0 : row >= this.rows ? this.rows - 1 : row;

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
}