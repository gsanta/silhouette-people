import { Vector2 } from "babylonjs/Maths/math.vector";


export class AreaMap {
    readonly topLeft: Vector2;
    readonly botRight: Vector2;
    private readonly offsetX: number;
    private readonly offsetY: number;

    readonly columns: number;
    readonly rows: number;
    readonly gridSize: number;

    private map: number[][] = [];

    constructor(topLeft: Vector2, botRight: Vector2, gridSize: number) {
        this.topLeft = topLeft;
        this.botRight = botRight;
        this.gridSize = gridSize;


    
        this.columns = this.botRight.x - this.topLeft.x;
        this.rows = this.botRight.y - this.topLeft.y;

        this.init;
    }

    block(row: number, column: number) {
        this.map[row][column] = 1;
    }

    blockRect(min: Vector2, max: Vector2) {
        [min, max] = this.getBoundedRect(min, max);



        const minGridX = min.x 
    }

    private getBoundedRect(min: Vector2, max: Vector2): [Vector2, Vector2] {
        min = this.offsetPoint(min);
        max = this.offsetPoint(max);

        if (min.x < this.topLeft.x) {
            min.x = this.topLeft.x;
        }

        if (min.y < this.topLeft.y) {
            min.y = this.topLeft.y;
        }

        if (max.x > this.botRight.x) {
            max.x = this.botRight.x;
        }

        if (max.y > this.botRight.y) {
            max.y = this.botRight.y;
        }

        return [min, max];
    }

    private offsetPoint(point: Vector2): Vector2 {
        return new Vector2(point.x - this.topLeft.x, point.y - this.topLeft.y);
    }

    setEmpty(row: number, column: number) {
        this.map[row][column] = 0;
    }

    isBlocked(row: number, column: number) {
        return this.map[row][column] === 1;
    }

    private init() {
        this.map = [];

        for (let i = 0; i < this.rows; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.map[i][j] = 0;
            }
        }
    }
}