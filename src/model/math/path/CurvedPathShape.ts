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

    constructor(controlPoints: Vector3[], pathes: Vector3[][]) {
        this._pathes = pathes;
        this._controlPoints = controlPoints;
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

    static FromEdge(endPoints: Vector3[], yPos: number): CurvedPathShape {
        const linePath = LinePathShape.FromEdge(endPoints, yPos);
        const bounds = linePath.bounds;
        const controlPoints = this.getPath(toVector2(endPoints[0]), toVector2(endPoints[1])).map(p => toVector3(p, yPos));
        const path1 = this.getPath(toVector2(bounds.p1), toVector2(bounds.p2)).map(p => toVector3(p, yPos));
        const path2 = this.getPath(toVector2(bounds.p4), toVector2(bounds.p3)).map(p => toVector3(p, yPos));
        
        return new CurvedPathShape(controlPoints, [path1, path2]);
    }

    private static getPath(endP1: Vector2, endP2: Vector2): Vector2[] {
        const line = new Line(endP1, endP2);

        const curveP = line.getBisector(line.size).p1;
        return [line.p1, curveP, line.p2];
    }
}