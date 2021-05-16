import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { PathItem } from "../PathItem";
import { WorldProvider } from "../../../service/WorldProvider";
import { MaterialStore } from "../../../store/MaterialStore";
import { RouteItem } from "./RouteItem";
import { GraphVertex } from "../../../service/graph/GraphImpl";

export class RouteVisualizer {

    private worldProvider: WorldProvider;
    private materialStore: MaterialStore;

    private meshes: Mesh[] = [];

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualize(route: RouteItem): void {
        this.visualizeArrowHead(route);
        this.visualizeArrow(route);
    }

    dispose() {
        this.meshes.forEach(mesh => mesh.dispose());
        this.meshes = [];
    }

    private visualizeArrowHead(route: RouteItem) {
            const pathes = this.createArrowHeadPathes(route);

            const mesh = MeshBuilder.CreateRibbon("arrow-head", {pathArray: pathes}, this.worldProvider.scene);

            mesh.material = this.materialStore.getActivePathMaterial();
            // mesh.material.wireframe = true;
            // path.addArrowHead(mesh);
            this.meshes.push(mesh);
    }

    private createArrowHeadPathes(route: RouteItem) {
        const points = route.points.map(point => point.p);
        const prevPos = points[points.length - 2].clone();
        const lastPos = points[points.length - 1].clone();
        const angle = this.getAngle(prevPos, lastPos);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.4;
        const end = lastPos;

        const path1 = [
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.8, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.8, radius * Math.sin(angelMinus))),
        ];

        const path2 = [
            end.add(new Vector3(radius * Math.cos(angle), 0.8, radius * Math.sin(angle))),
            end.add(new Vector3(radius * Math.cos(angle), 0.8, radius * Math.sin(angle))),
        ];

        return [path1, path2];
    }

    private visualizeArrow(route: RouteItem) {
        const points = route.points;
        for (let i = 0; i < points.length - 1; i++) {
            this.createArrow(i, points[i], points[i + 1]);
        }
    }

    private createArrow(index: number, p1: GraphVertex, p2: GraphVertex): void {
        const pathes = this.createArrowPathes(p1, p2);
        const mesh = MeshBuilder.CreateRibbon(`arrow-line-${index}`, { pathArray: pathes, updatable: true }, this.worldProvider.scene);

        mesh.material = this.materialStore.getActivePathMaterial();
        this.meshes.push(mesh);
    }

    private createArrowPathes(v1: GraphVertex, v2: GraphVertex) {
        const angle = this.getAngle(v1.p, v2.p);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.2;
        
        const [start, end] = [v1.p, v2.p];

        const path1 = [
            start.add(new Vector3(radius * Math.cos(angelPlus), 0.8, radius * Math.sin(angelPlus))),
            end.add(new Vector3(radius * Math.cos(angelPlus), 0.8, radius * Math.sin(angelPlus))),
        ];

        const path2 = [
            start.add(new Vector3(radius * Math.cos(angelMinus), 0.8, radius * Math.sin(angelMinus))),
            end.add(new Vector3(radius * Math.cos(angelMinus), 0.8, radius * Math.sin(angelMinus))),
        ];

        return [path1, path2];
    }

    private getAngle(startPoint: Vector3, endPoint) {
        const vector = endPoint.subtract(startPoint);
        return Math.atan2(vector.z, vector.x);
    }
}