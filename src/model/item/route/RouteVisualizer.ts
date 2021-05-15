import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { PathItem } from "../PathItem";
import { WorldProvider } from "../../../service/WorldProvider";
import { MaterialStore } from "../../../store/MaterialStore";
import { RouteItem } from "./RouteItem";

export class RouteVisualizer {

    private worldProvider: WorldProvider;
    private materialStore: MaterialStore;

    private meshes: Mesh[] = [];

    constructor(worldProvider: WorldProvider, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualize(route: RouteItem): void {
        const path = route.path;
        this.visualizeArrowHead(route);
        this.visualizeArrow(path);
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
        const points = route.path.getPoints();
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

    private visualizeArrow(pathItem: PathItem) {
        const points = pathItem.getPoints();
        for (let i = 0; i < points.length - 1; i++) {
            this.createArrow(pathItem, i, points[i], points[i + 1]);
        }
    }

    private createArrow(pathItem: PathItem, index: number, p1: Vector3, p2: Vector3): void {
        const pathes = this.createArrowPathes(p1, p2);
        const mesh = MeshBuilder.CreateRibbon(`arrow-line-${index}`, { pathArray: pathes, updatable: true }, this.worldProvider.scene);

        mesh.material = this.materialStore.getActivePathMaterial();
        pathItem.addMesh(mesh);
        this.meshes.push(mesh);
    }

    private createArrowPathes(p1: Vector3, p2: Vector3) {
        const angle = this.getAngle(p1, p2);
        const angelPlus = angle + Math.PI / 2;
        const angelMinus = angle - Math.PI / 2;
        const radius = 0.2;
        
        const [start, end] = [p1, p2];

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