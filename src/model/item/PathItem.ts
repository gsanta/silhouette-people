import { Mesh } from "babylonjs";
import { Vector3 } from "babylonjs/Maths/math.vector";


export class PathItem {
    private points: Vector3[] = [];
    private meshes: Mesh[] = [];
    private arrowHead: Mesh;

    constructor(points: Vector3[]) {
        this.points = points;
    }

    addMesh(mesh: Mesh) {
        this.meshes.push(mesh);
    }

    getMesh(name: string) {
        return this.meshes.find(mesh => mesh.name === name);
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

    dispose() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.arrowHead && this.arrowHead.dispose();
    }
}