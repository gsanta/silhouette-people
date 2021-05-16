import { Mesh } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";


export class PathItem {
    private points: Vector3[] = [];
    private meshes: Mesh[] = [];
    private arrowHead: Mesh;

    constructor(points: Vector3[]) {
        this.points = points;
    }

    addPointLast(point: Vector3) {
        this.points.push(point);
    }

    addPointFirst(point: Vector3) {
        this.points.unshift(point);
    }

    removePointLast() {
        this.points.pop()
    }

    removePointFirst() {
        this.points.shift();
    }

    setPoint(index: number, point: Vector3) {
        this.points[index] = point;
    }

    getPoints() {
        return this.points;
    }

    getFirstPoint(): Vector3 {
        return this.points[0];
    }

    getLastPoint(): Vector3 {
        return this.points[this.points.length - 1];
    }

    removePointAtIndex(index: number) {
        this.points.splice(index, 1);
    }

    size(): number {
        return this.points.length;
    }
}