import { Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { toVector2, toVector3 } from "../../../helpers";
import { GraphEdge } from "../../../service/graph/GraphEdge";
import { Line } from "../shapes/Line";
import { Quad } from "../shapes/Quad";
import { LinePathShape } from "./LinePathShape";
import { PathShape } from "./PathShape";


export class CurvedPathShape implements PathShape {
    private _pathes: Vector3[][];

    constructor(pathes: Vector3[][]) {
        this._pathes = pathes;
    }

    get path(): Vector3[][] {
        return this._pathes;
    }

    get bounds(): Quad {
        return null;
    }

    static FromEdge(edge: GraphEdge): CurvedPathShape {
        const linePath = LinePathShape.FromEdge(edge);
        const path1 = this.getPath(toVector2(linePath.p1), toVector2(linePath.p2)).map(p => toVector3(p, edge.yPos));
        const path2 = this.getPath(toVector2(linePath.p4), toVector2(linePath.p3)).map(p => toVector3(p, edge.yPos));
        
        return new CurvedPathShape([path1, path2]);
    }

    private static getPath(endP1: Vector2, endP2: Vector2): Vector2[] {
        const line = new Line(endP1, endP2);

        const curveP = line.getBisector(line.size).p1;
        return [line.p1, curveP, line.p2];
    }
}