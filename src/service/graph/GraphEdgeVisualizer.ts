import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { MaterialStore } from "../../store/MaterialStore";
import { SceneService } from "../SceneService";
import { GraphEdge } from "./GraphEdge";

type getMaterialFunc = (edge: GraphEdge) => string;

export class GraphEdgeVisualizer {
    private readonly worldProvider: SceneService;
    private readonly materialStore: MaterialStore;

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.worldProvider = worldProvider;
        this.materialStore = materialStore;
    }

    visualizeRoute(route: RouteItem, getMaterial: getMaterialFunc): Mesh[] {
        const meshes: Mesh[] = [];
        meshes.push(...route.getEdges().map(edge => this.createPathEdge(edge, false, getMaterial)));
        return meshes;
    }

    visualizeEdges(graphEdge: GraphEdge[], getMaterial: getMaterialFunc) {
        graphEdge.forEach(edge => edge.mesh = this.createPathEdge(edge, true, getMaterial));
    }

    visualizeEdge(graphEdge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc) {
        if (graphEdge.mesh) {
            graphEdge.mesh.dispose();
        }

        graphEdge.mesh = this.createPathEdge(graphEdge, updatable, getMaterial)
    }

    updateEdge(graphEdge: GraphEdge) {
        const id = this.getId(graphEdge);
        const pathes = this.getPathes(graphEdge);

        MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: true, instance: graphEdge.mesh}, this.worldProvider.scene);
    }

    private createPathEdge(edge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc): Mesh {
        const id = this.getId(edge);
        const pathes = this.getPathes(edge);

        const mesh = MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: updatable}, this.worldProvider.scene);
        mesh.material = this.materialStore.getMaterialByName(getMaterial(edge));

        return mesh;
    }

    private getPathes(edge: GraphEdge): Vector3[][] {
        const path1 = [edge.dimensions.p1, edge.dimensions.p2];
        const path2 = [edge.dimensions.p4, edge.dimensions.p3];

        return [path1, path2];
    }

    private getId(edge: GraphEdge): string {
        const [v1, v2] = [edge.v1, edge.v2]

        return `edge-${v1.id}-${v2.id}`;
    }
}