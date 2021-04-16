import { Mesh, Vector2, Vector3 } from "babylonjs";
import { Rect } from "../general/shape/Rect";

export class QuarterMap {
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
        this.rows = (this.topLeft.y - this.botRight.y) / gridSize;
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
        const topLeftIndex = this.getIndexAtWorldCoordinate(new Vector2(min.x, max.z));
        if (topLeftIndex) {
            const pos = this.getGridCoordinate(topLeftIndex);
    
            for (let i = pos.x; i <= pos.x + yNum; i++) {
                for (let j = pos.y; j <= pos.y + xNum; j++) {
                    this.fillGrid(this.getIndexAtGridCoordinate(i, j), num);
                }
            }
        }
    }

    fillPath(path: Vector2[], num: number) {
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

    getIndexAtWorldCoordinate(coordinate: Vector2): number {
        let col = Math.floor((coordinate.x - this.topLeft.x) / this.gridSize);
        if (col < 0 || col >= this.columns) {
            return undefined;
        }

        let row = Math.abs(Math.ceil((coordinate.y - this.topLeft.y) / this.gridSize));
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
        const x = this.topLeft.x + pos.x * this.gridSize + this.gridSize / 2;
        const y = this.topLeft.y - pos.y * this.gridSize - this.gridSize / 2;
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
        return Math.abs(this.botRight.y - this.topLeft.y) / this.gridSize;
    }

    getWidth() {
        return this.botRight.x - this.topLeft.x;
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

        console.log(str);
    }
}