import { Vector3 } from "babylonjs";
import { toVector2, toVector3 } from "../../../helpers";
import { BezierAdatper } from "../shapes/BezierAdapter";
import { Line } from "../shapes/Line";
import { Quad } from "../shapes/Quad";
import { PathShape, PathShapeType } from "./PathShape";

export class CurvedPathShape implements PathShape {
    readonly type = PathShapeType.CURVED;
    private _pathes: Vector3[][];
    private _controlPoints: Vector3[];
    private _cuvePoints: Vector3[];
    private _width: number;

    private bezierAdapter: BezierAdatper;

    constructor(controlPoints: Vector3[], width: number) {
        this._width = width;
        this.calcControlPoints(controlPoints);
        this.calcCurvePoints();
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

    get size() {
        return this.bezierAdapter.size;
    }

    getT(ratio: number): Vector3 {
        return this.bezierAdapter.getT(ratio);
    }

    update(controlPointIndex: number, val: Vector3) {
        this._controlPoints[controlPointIndex] = val;
        this.calcCurvePoints();
        this.calcPath();
    }

    private calcControlPoints(controlPoints: Vector3[]) {
        if (controlPoints.length === 2) {
            const y = controlPoints[0].y;
            const [p1, p2] = [controlPoints[0], controlPoints[1]]

            const line = new Line(toVector2(p1), toVector2(p2));

            const curveP = line.getBisector(line.size).p1;
            this._controlPoints =  [line.p1, curveP, line.p2].map(p => toVector3(p, y));
        }
    }

    private calcCurvePoints() {
        this.bezierAdapter = new BezierAdatper(this.controlPoints);
        this._cuvePoints = this.bezierAdapter.points;    
    }

    private calcPath() {
        const path1: Vector3[] = [];
        const path2: Vector3[] = [];
        const y = this._controlPoints[0].y;

        this._cuvePoints.forEach((p, i) => {
            const angle = this.getPointTangent(i);

            const angelPlus = angle + Math.PI / 2;
            const angelMinus = angle - Math.PI / 2;
            const radius = this._width ? this._width / 2 : 0.05;

            const p1 = p.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
            const p2 = p.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus)));
            path1.push(p1);
            path2.push(p2);
        });

        this._pathes = [path1, path2];
    }

    private getPointTangent(controlPointIndex: number) {
        // const [c1, c2] = [this._controlPoints[0], this._controlPoints[1]];

        // let p1: Vector3, p2: Vector3, p3: Vector3;

        const points = this._cuvePoints;

        if (controlPointIndex === 0) {
            return new Line(toVector2(points[0]), toVector2(points[1])).angle.rad;
        } else if (controlPointIndex === points.length - 1) {
            const p1 = points[controlPointIndex - 1];
            const p2 = points[controlPointIndex];
            return new Line(toVector2(p1), toVector2(p2)).angle.rad;
        } else {
            const p1 = points[controlPointIndex - 1];
            const p2 = points[controlPointIndex];
            const p3 = points[controlPointIndex + 1];

            const angle1 = new Line(toVector2(p1), toVector2(p2)).angle.rad;
            const angle2 = new Line(toVector2(p2), toVector2(p3)).angle.rad;
            return (angle1 + angle2) / 2;
        }

        // const angle = this.getAngle(c1, c2);
        // const angelPlus = angle + Math.PI / 2;
        // const angelMinus = angle - Math.PI / 2;
        // const radius = this._width ? this._width / 2 : 0.05;
        
        // const [start, end] = [c1, c2];
        // const y = this._controlPoints[0].y;

        // const p1 = start.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        // const p2 = end.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        // const p3 = end.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus))); 
        // const p4 = start.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus)));

        // this._bounds = new Quad(p1, p2, p3, p4);
    }

    // private getPath(endP1: Vector2, endP2: Vector2): Vector2[] {
    //     const line = new Line(endP1, endP2);

    //     const curveP = line.getBisector(line.size).p1;
    //     return [line.p1, curveP, line.p2];
    // }
}