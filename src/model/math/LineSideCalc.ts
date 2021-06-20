import { Vector2 } from "babylonjs";
import { Line } from "./shapes/Line";
const determinant = require("robust-determinant");

export class LineSideCalc {
    private readonly line: Line;
    private lexicographicOrder: [Vector2, Vector2];

    constructor(line: Line) {
        this.line = line;
    }

    determineSide(point: Vector2): number {
        const side = this.getSide(point);
        return side;
    }

    private getSide(point: Vector2): number {
        const points = this.getPointsLexicographically();
        const det = determinant([[point.x, point.y, 1], [points[0].x, points[0].y, 1], [points[1].x, points[1].y, 1] ]);
        return det[0] < 0 ? -1 : det[0] > 0 ? 1 : 0;
    }

    private getPointsLexicographically(): [Vector2, Vector2] {
        if (!this.lexicographicOrder) {
            this.lexicographicOrder = this.determineLexicographicOrder();
        }

        return this.lexicographicOrder;
    }

    private determineLexicographicOrder(): [Vector2, Vector2]  {
        if (this.line.p1.y === this.line.p2.y) {
            if (this.line.p1.x > this.line.p2.x) {
                return [this.line.p2, this.line.p1];
            } else {
                return [this.line.p1, this.line.p2];
            }
        } else if (this.line.p1.y > this.line.p2.y) {
            return [this.line.p2, this.line.p1];
        } else {
            return [this.line.p1, this.line.p2];
        }
    }
}