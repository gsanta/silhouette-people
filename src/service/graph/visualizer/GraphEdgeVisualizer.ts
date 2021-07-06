import { Mesh, MeshBuilder } from "babylonjs";
import { RouteItem } from "../../../model/objects/route/RouteItem";
import { MaterialStore } from "../../../store/MaterialStore";
import { SceneService } from "../../SceneService";
import { GraphEdge } from "../GraphEdge";
import { LinePathVisualizer } from "./LinePathVisualizer";
import { getMaterialFunc, PathVisualizer } from "./PathVisualizer";

export class GraphEdgeVisualizer {
    private readonly sceneService: SceneService;
    private readonly materialStore: MaterialStore;
    private visualizers: PathVisualizer[] = []

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.sceneService = worldProvider;
        this.materialStore = materialStore;

        this.visualizers.push(new LinePathVisualizer(this.sceneService, this.materialStore))
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
        const pathes = graphEdge.shape.path;

        MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: true, instance: graphEdge.mesh}, this.sceneService.scene);
    }

    private createPathEdge(edge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc): Mesh {
        const id = this.getId(edge);
        const pathes = edge.shape.path;

        const mesh = MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: updatable}, this.sceneService.scene);
        mesh.material = this.materialStore.getMaterialByName(getMaterial(edge));

        return mesh;
    }

    private getId(edge: GraphEdge): string {
        const [v1, v2] = [edge.v1, edge.v2]

        return `edge-${v1.id}-${v2.id}`;
    }
}