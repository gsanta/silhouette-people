import { Mesh, MeshBuilder, StandardMaterial, Vector3 } from "babylonjs";
import { RouteItem } from "../../model/objects/route/RouteItem";
import { SceneService } from "../SceneService";
import { GraphEdge } from "./GraphEdge";

export class GraphVisualizer {
    private readonly worldProvider: SceneService;

    constructor(worldProvider: SceneService) {
        this.worldProvider = worldProvider;
    }

    visualizeRoute(route: RouteItem, material: StandardMaterial): Mesh[] {
        const meshes: Mesh[] = [];
        meshes.push(...route.getEdges().map(edge => this.createPathEdge(edge, material)));
        return meshes;
    }

    visualizeEdges(graphEdge: GraphEdge[], material: StandardMaterial) {
        graphEdge.forEach(edge => this.createPathEdge(edge, material));
    }

    private createPathEdge(edge: GraphEdge, material: StandardMaterial): Mesh {
        const [v1, v2] = [edge.v1, edge.v2]
        const path1 = [edge.dimensions.p1, edge.dimensions.p2];
        const path2 = [edge.dimensions.p4, edge.dimensions.p3];
        const mesh = MeshBuilder.CreateRibbon(`path-${v1.id}-${v2.id}`, {pathArray: [path1, path2], updatable: false}, this.worldProvider.scene);
        mesh.material = material;

        return mesh;
    }
}