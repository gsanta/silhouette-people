import { Vector3 } from "babylonjs";
import { Quad } from "../../../model/math/shapes/Quad";
import { GraphEdge } from "../../graph/GraphEdge";

export class EdgeDimensionCalc {

    calc(edge: GraphEdge): Quad {
        const angle = this.getAngle(edge.v1.p, edge.v2.p);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = edge.thickness ? edge.thickness / 2 : 0.05;
        
        const [start, end] = [edge.v1.p, edge.v2.p];

        const p1 = start.add(new Vector3(radius * Math.cos(angelPlus), edge.yPos, radius * Math.sin(angelPlus)));
        const p2 = end.add(new Vector3(radius * Math.cos(angelPlus), edge.yPos, radius * Math.sin(angelPlus)));
        const p3 = end.add(new Vector3(radius * Math.cos(angelMinus), edge.yPos, radius * Math.sin(angelMinus))); 
        const p4 = start.add(new Vector3(radius * Math.cos(angelMinus), edge.yPos, radius * Math.sin(angelMinus)));

        return new Quad(p1, p2, p3, p4);
    }

    
    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}