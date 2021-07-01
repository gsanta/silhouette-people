import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { SceneService } from "../SceneService";
import { GraphEdge } from "./GraphEdge";

export class GraphEdgeVisualizer {
    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        this.worldProvider = worldProvider;
    }

    visualizeRoute(route: RouteItem, material: StandardMaterial): Mesh[] {
        const meshes: Mesh[] = [];
        meshes.push(...route.getEdges().map(edge => this.createPathEdge(edge, material, false)));
        return meshes;
    }

    visualizeEdges(graphEdge: GraphEdge[], material: StandardMaterial) {
        graphEdge.forEach(edge => edge.mesh = this.createPathEdge(edge, material, true));
    }

    visualizeEdge(graphEdge: GraphEdge, material: StandardMaterial, updatable = false) {
        if (graphEdge.mesh) {
            graphEdge.mesh.dispose();
        }

        graphEdge.mesh = this.createPathEdge(graphEdge, material, updatable)
    }

    updateEdge(graphEdge: GraphEdge) {
        const id = this.getId(graphEdge);
        const pathes = this.getPathes(graphEdge);

        MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: true, instance: graphEdge.mesh}, this.worldProvider.scene);
    }

    private createPathEdge(edge: GraphEdge, material: StandardMaterial, updatable: boolean): Mesh {
        const id = this.getId(edge);
        const pathes = this.getPathes(edge);

        const mesh = MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: updatable}, this.worldProvider.scene);
        mesh.material = material;

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