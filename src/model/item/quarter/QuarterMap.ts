import { Mesh, Vector2, Vector3 } from "babylonjs";
import { Rect } from "../../math/shapes/Rect";

export class QuarterMap {
    readonly min: Vector2;
    readonly max: Vector2;

    readonly columns: number;
    readonly rows: number;
    readonly gridSize: number;

    private map: number[] = [];

    constructor(min: Vector2, max: Vector2, gridSize: number) {
        this.min = min;
        this.max = max;
        this.gridSize = gridSize;

        this.columns = (this.max.x - this.min.x) / gridSize;
        this.rows = (this.max.y - this.min.y) / gridSize;
    }

    len() {
        return this.rows * this.columns;
    }

    fillGrid(index: number, num: number) {
        this.map[index] = num;
    }

    fillRect(min: Vector3, max: Vector3, num: number) {
        const xNum = Math.ceil((max.x - min.x) / this.gridSize);
        const yNum = Math.ceil((max.z - min.z) / this.gridSize);
        const topLeftIndex = this.getIndexAtWorldCoordinate(new Vector3(min.x, 0, max.z));
        if (topLeftIndex) {
            const pos = this.getGridCoordinate(topLeftIndex);
    
            for (let i = pos.x; i <= pos.x + yNum; i++) {
                for (let j = pos.y; j <= pos.y + xNum; j++) {
                    this.fillGrid(this.getIndexAtGridCoordinate(i, j), num);
                }
            }
        }
    }

    fillPath(path: Vector3[], num: number) {
        path.forEach(point => {
            const index = this.getIndexAtWorldCoordinate(point);
            if (index !== undefined) {
                this.fillGrid(index, num);
            }
        });
    }

    fillMeshes(meshes: Mesh[]) {
        meshes.forEach(mesh => {
            mesh.computeWorldMatrix();
            const minimum = mesh.getBoundingInfo().boundingBox.minimumWorld;
            const maximum = mesh.getBoundingInfo().boundingBox.maximumWorld;
    
            this.fillRect(minimum, maximum, 1);
        });
    }

    setEmpty(row: number, column: number) {
        this.map[row][column] = 0;
    }

    isBlocked(index: number) {
        return this.map[index] === 1;
    }

    getNum(index: number): number {
        return this.map[index];
    }

    getIndexAtGridCoordinate(x: number, y: number) {
        return y * this.rows + x;
    }

    getIndexAtWorldCoordinate(coordinate: Vector3): number {
        let col = Math.floor((coordinate.x - this.min.x) / this.gridSize);
        if (col < 0 || col >= this.columns) {
            return undefined;
        }

        let row = Math.abs(Math.ceil((coordinate.z - this.max.y) / this.gridSize));
        if (row < 0 || row >= this.getHeight()) {
            return undefined;
        }

        return row * this.rows + col;
    }

    getGridCoordinate(index: number): Vector2 {
        return new Vector2(index % this.columns, Math.floor(index / this.columns));
    }

    getWorldCoordinate(index: number) {
        const pos = this.getGridCoordinate(index);
        const x = this.min.x + pos.x * this.gridSize + this.gridSize / 2;
        const y = this.max.y - pos.y * this.gridSize - this.gridSize / 2;
        return new Vector2(x, y);
    }
    
    getWorldBounds(): Rect {
        const topLeftIndex = this.getIndexAtGridCoordinate(0, 0);
        const botRightIndex = this.getIndexAtGridCoordinate(this.columns - 1, this.rows - 1);
    
        const topLeft = this.getWorldCoordinate(topLeftIndex);
        const botRight = this.getWorldCoordinate(botRightIndex);

        return new Rect(topLeft, botRight);
    }

    getHeight() {
        return Math.abs(this.max.y - this.min.y) / this.gridSize;
    }

    getWidth() {
        return this.max.x - this.min.x;
    }

    toString() {
        let str = ''

        const arr: number[][] = [];

        for (let i = 0; i < this.rows; i++) {
            arr.push([]);
            str += '\n';
            for (let j = 0; j < this.columns; j++) {
                const index = this.getIndexAtGridCoordinate(j, i);
                arr[i][j] = this.isBlocked(index) ? 0 : 1;
                str += arr[i][j]
            }
        }
    }
}