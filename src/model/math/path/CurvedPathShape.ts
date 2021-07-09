import { Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { toVector2, toVector3 } from "../../../helpers";
import { Line } from "../shapes/Line";
import { Quad } from "../shapes/Quad";
import { LinePathShape } from "./LinePathShape";
import { PathShape, PathShapeType } from "./PathShape";

export class CurvedPathShape implements PathShape {
    readonly type = PathShapeType.CURVED;
    private _pathes: Vector3[][];
    private _controlPoints: Vector3[];
    private _width: number;

    constructor(controlPoints: Vector3[], width: number) {
        this._width = width;
        this.calcControlPoints(controlPoints);
        this.calcPath();
    }

    get path(): Vector3[][] {
        return this._pathes;
    }

    get bounds(): Quad {
        return null;
    }

    get controlPoints(): Vector3[] {
        return this._controlPoints;
    }

    update(controlPointIndex: number, val: Vector3) {
        this._controlPoints[controlPointIndex] = val;
        this.calcPath();
    }

    private calcControlPoints(controlPoints: Vector3[]) {
        if (controlPoints.length === 2) {
            const y = controlPoints[0].y;

            this._controlPoints = this.getPath(toVector2(controlPoints[0]), toVector2(controlPoints[1])).map(p => toVector3(p, y));
        }
    }

    private calcPath() {
        const y = this._controlPoints[0].y;

        const linePath = new LinePathShape([this._controlPoints[0], this._controlPoints[2]], this._width);
        const bounds = linePath.bounds;
        const path1 = this.getPath(toVector2(bounds.p1), toVector2(bounds.p2)).map(p => toVector3(p, y));
        const path2 = this.getPath(toVector2(bounds.p4), toVector2(bounds.p3)).map(p => toVector3(p, y));

        this._pathes = [path1, path2];
    }

    private getPath(endP1: Vector2, endP2: Vector2): Vector2[] {
        const line = new Line(endP1, endP2);

        const curveP = line.getBisector(line.size).p1;
        return [line.p1, curveP, line.p2];
    }
}