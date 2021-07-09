import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../../service/graph/GraphEdge";
import { CurvedPathShape } from "./CurvedPathShape";
import { LinePathShape } from "./LinePathShape";
import { PathShapeType } from "./PathShape";


export class PathShapeFactory {
    create(edge: GraphEdge, type: PathShapeType) {
        if (type === PathShapeType.LINE) {
            return new LinePathShape([edge.v1.p, edge.v2.p], edge.thickness);
        } else if (type === PathShapeType.CURVED) {
            return new CurvedPathShape([edge.v1.p, edge.v2.p], edge.thickness);
        }
    }

    createFromControlPoints(edge: GraphEdge, controlPoints: Vector3[]) {
        if (controlPoints.length === 2) {
            return new LinePathShape(controlPoints, edge.thickness);
        } else if (controlPoints.length === 3) {
            return new CurvedPathShape(controlPoints, edge.thickness);
        }
    }
}