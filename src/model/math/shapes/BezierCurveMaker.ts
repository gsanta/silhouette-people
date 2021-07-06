import { Vector2 } from "babylonjs/Maths/math.vector";
import { CurvedPathShape } from "../path/CurvedPathShape";
import { Line } from "./Line";
import Bezier from "bezier-js";


export class BezierCurveMaker {


    simpleQuadraticCurve(line: Line): CurvedPathShape {
        const len = line.size;
        const bisector = line.getBisector(len);

        // const bezier = new Bezier(150,40 , 80,30 , 105,150);
    }
}