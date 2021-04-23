import { Vector3 } from "babylonjs/Maths/math.vector";


export class Path {
    private points: Vector3[] = [];

    constructor(points: Vector3[]) {
        this.points = points;
    }

    addPoint(point: Vector3) {
        this.points.push(point);
    }

    setPoint(index: number, point: Vector3) {
        this.points[index] = point;
    }

    getPoints() {
        return this.points;
    }

    getStartPoint(): Vector3 {
        return this.points[0];
    }

    getEndPoint(): Vector3 {
        return this.points[this.points.length - 1];
    }
}