import { Mesh } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";


export class PathItem {
    private points: Vector3[] = [];
    private mesh: Mesh;
    private arrowHead: Mesh;

    constructor(points: Vector3[]) {
        this.points = points;
    }

    addMesh(mesh: Mesh) {
        this.mesh = mesh;
    }

    getMesh() {
        return this.mesh;
    }

    addArrowHead(mesh: Mesh) {
        this.arrowHead = mesh;
    }

    getArrowHead(): Mesh {
        return this.arrowHead;
    }

    removeArrowHead(): void {
        this.arrowHead = undefined;
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

    size(): number {
        return this.points.length;
    }

    dispose() {
        this.mesh && this.mesh.dispose();
        this.arrowHead && this.arrowHead.dispose();
    }
}