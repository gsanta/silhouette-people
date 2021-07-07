import { Vector3 } from "babylonjs";
import { Quad } from "../shapes/Quad";
import { PathShape, PathShapeType } from "./PathShape";

export class LinePathShape implements PathShape {
    readonly type = PathShapeType.LINE;
    private _bounds: Quad;
    private _pathes: Vector3[][];
    private _controlPoints: Vector3[];

    constructor(controlPoints: Vector3[], points: Quad) {
        this._bounds = points;
        this._controlPoints = controlPoints;
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

    private calcPath() {
        const path1 = [this._bounds.p1, this._bounds.p2];
        const path2 = [this._bounds.p4, this._bounds.p3];

        this._pathes = [path1, path2];
    }

    static FromEdge(controlPoints: Vector3[], width?: number): LinePathShape {
        const [c1, c2] = [controlPoints[0], controlPoints[1]];
        const angle = this.getAngle(c1, c2);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = width ? width / 2 : 0.05;
        
        const [start, end] = [c1, c2];
        const y = controlPoints[0].y;

        const p1 = start.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        const p2 = end.add(new Vector3(radius * Math.cos(angelPlus), y, radius * Math.sin(angelPlus)));
        const p3 = end.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus))); 
        const p4 = start.add(new Vector3(radius * Math.cos(angelMinus), y, radius * Math.sin(angelMinus)));

        return new LinePathShape(controlPoints, new Quad(p1, p2, p3, p4));
    }

    
    private static getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}