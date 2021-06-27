import { Color3, Matrix, StandardMaterial, Vector2 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";
import { Tool } from "./Tool";


export class RouteTool extends Tool {

    private readonly sceneService: SceneService;
    private readonly graphService: GraphService;

    constructor(sceneService: SceneService, graphService: GraphService) {
        super(ToolType.ROUTE);
        this.sceneService = sceneService;
        this.graphService = graphService;
    }

    move() {
        const scene = this.sceneService.scene;
        let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), null);
        let hit = scene.pickWithRay(ray, (mesh) => {
            return mesh.name.startsWith('ground');
        });
        const p = hit.pickedPoint;
        const [dist, edge] = this.getClosestLine(toVector2(p));
        if (dist < 0.5) {
            const material = new StandardMaterial('abcd', this.sceneService.scene);
            material.diffuseColor = Color3.Yellow();
            edge.mesh.material = material;
        }
    }

    up() {
    }

    private getClosestLine(point: Vector2): [number, GraphEdge] {
        const edges = this.graphService.getGraph().edges;

        const edgeDistances: [number, GraphEdge][] = edges.map(edge => [edge.line.getMinDistance(point), edge]);
        edgeDistances.sort((a, b) => a[0] - b[0]);
        return edgeDistances[0];
    }
}