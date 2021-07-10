import { Vector3 } from "babylonjs";
import { Quad } from "../shapes/Quad";
import { PathShape, PathShapeType } from "./PathShape";

export class LinePathShape implements PathShape {
    readonly type = PathShapeType.LINE;
    private _bounds: Quad;
    private _pathes: Vector3[][];
    private _controlPoints: Vector3[];
    private _width: number;

    constructor(controlPoints: Vector3[], width?: number) {
        this._width = width;
        this._controlPoints = controlPoints.map(p => p.clone());
        this.calcBounds();
        this.calcPath();
    }

    get path(): Vector3[][] {
        return this._pathes;
    }
    
    get bounds(): Quad {
        return this._bounds;
    }

    get controlPoints(): Vector3[] {
        return this._controlPoints;
    }

    get internalControlPoints(): Vector3[] {
        return [];
    }

    get size(): number {
        return this.controlPoints[0].subtract(this.controlPoints[1]).length();
    }

    getT(ratio: number): Vector3 {
        const [cp1, cp2] = [this.controlPoints[0], this.controlPoints[1]];
        return cp1.add(cp2.subtract(cp1).multiply(new Vector3(ratio, ratio, ratio)));
    }

    getDerivative(t: number, reversed = false): Vector3 {
        const [cp1, cp2] = [this.controlPoints[0], this.controlPoints[1]];

        const vec = cp2.subtract(cp1).normalize();
        return reversed ? vec.negate() : vec;
    }

    update(controlPointIndex: number, val: Vector3) {
        this._controlPoints[controlPointIndex] = val.clone();
        this.calcBounds();
        this.calcPath();
    }

    private calcPath() {
        const path1 = [this._bounds.p1, this._bounds.p2];
        const path2 = [this._bounds.p4, this._bounds.p3];

        this._pathes = [path1, path2];
    }

    private calcBounds() {
        const [c1, c2] = [this._controlPoints[0], this._controlPoints[1]];
        const angle = this.getAngle(c1, c2);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = this._width ? this._width / 2 : 0.05;
        
        const [start, end] = [c1, c2];
        const y = this._controlPoints[0].y;

        const p1 = start.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        const p2 = end.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        const p3 = end.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus))); 
        const p4 = start.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus)));

        this._bounds = new Quad(p1, p2, p3, p4);
    }
    
    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}