import { Mesh, MeshBuilder } from "babylonjs";
import { MaterialStore } from "../../../store/MaterialStore";
import { SceneService } from "../../SceneService";
import { GraphEdge } from "../GraphEdge";
import { getMaterialFunc, PathVisualizer } from "./PathVisualizer";


export class LinePathVisualizer implements PathVisualizer {
    private readonly materialStore: MaterialStore;
    private readonly sceneService: SceneService;

    constructor(sceneService: SceneService, materialStore: MaterialStore) {
        this.sceneService = sceneService;
        this.materialStore = materialStore;
    }

    create(edge: GraphEdge, updatable: boolean, getMaterial: getMaterialFunc): Mesh {
        return this.createPathEdge(edge, updatable, getMaterial);
    }

    update(edge: GraphEdge): void {
        const id = this.getId(edge);
        const pathes = edge.shape.path;

        MeshBuilder.CreateRibbon(id, {pathArray: pathes, updatable: true, instance: edge.mesh}, this.sceneService.scene);
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