import { Vector2, Vector3 } from "babylonjs/Maths/math.vector";
import { CurvedPathShape } from "../path/CurvedPathShape";
import { Line } from "./Line";
import Bezier from "bezier-js";
import { toVector3 } from "../../../helpers";


export class BezierCurveMaker {
    simpleQuadraticCurve(line: Line, yPos: number): CurvedPathShape {
        const len = line.size;
        const bisector = line.getBisector(len);

        const path: Vector3[][] = [[toVector3(line.p1, yPos), toVector3(bisector.p1, yPos), toVector3(line.p2, yPos)]];
        return null;//new CurvedPathShape(path);

        // const bezier = new Bezier(150,40 , 80,30 , 105,150);
    }
}