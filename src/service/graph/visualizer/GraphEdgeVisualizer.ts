import { Mesh, MeshBuilder } from "babylonjs";
import { PathShapeType } from "../../../model/math/path/PathShape";
import { RouteItem } from "../../../model/objects/route/RouteItem";
import { MaterialStore } from "../../../store/MaterialStore";
import { SceneService } from "../../SceneService";
import { GraphEdge } from "../GraphEdge";
import { LinePathVisualizer } from "./LinePathVisualizer";
import { getMaterialFunc, PathVisualizer } from "./PathVisualizer";

export class GraphEdgeVisualizer {
    private readonly sceneService: SceneService;
    private readonly materialStore: MaterialStore;
    private visualizers: Map<PathShapeType, PathVisualizer> = new Map();
    private linePathVisualizer: LinePathVisualizer;

    constructor(worldProvider: SceneService, materialStore: MaterialStore) {
        this.sceneService = worldProvider;
        this.materialStore = materialStore;

        this.linePathVisualizer = new LinePathVisualizer(this.sceneService, this.materialStore);

        this.visualizers.set(PathShapeType.LINE, new LinePathVisualizer(this.sceneService, this.materialStore));
    }

    visualizeRoute(route: RouteItem, getMaterial: getMaterialFunc): Mesh[] {
        const meshes: Mesh[] = [];
        route.getEdges().forEach(edge => {
            // if (this.visualizers.has(edge.shape.type)) {
            //     meshes.push(this.createPathEdge(edge, false, getMaterial));
            // }
            meshes.push(this.linePathVisualizer.create(edge, false, getMaterial));
        });
        return meshes;
    }

    visualizeEdges(graphEdge: GraphEdge[], getMaterial: getMaterialFunc) {
        graphEdge.forEach(edge => {
            // if (this.visualizers.has(edge.shape.type)) {
            //     edge.mesh = this.visualizers.get(edge.shape.type).create(edge, true, getMaterial)
            // }
            edge.mesh = this.linePathVisualizer.create(edge, true, getMaterial);

        });
    }

    visualizeEdge(edge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc) {
        if (edge.mesh) {
            edge.mesh.dispose();
        }

        edge.mesh = this.linePathVisualizer.create(edge, updatable, getMaterial);

        // if (this.visualizers.has(edge.shape.type)) {
        //     edge.mesh = this.visualizers.get(edge.shape.type).create(edge, updatable, getMaterial)
        // }
    }

    updateEdge(edge: GraphEdge) {
        this.linePathVisualizer.update(edge);

        // if (this.visualizers.has(edge.shape.type)) {
        //     this.visualizers.get(edge.shape.type).update(edge);
        // }
    }

    updateEdgeColor(edge: GraphEdge, getMaterial: getMaterialFunc) {
        edge.mesh.material = this.materialStore.getMaterialByName(getMaterial(edge));
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