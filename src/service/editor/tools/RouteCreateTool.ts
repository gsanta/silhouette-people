import { StandardMaterial, Color3, Matrix, Vector2 } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { MaterialStore, MaterialName } from "../../../store/MaterialStore";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { GraphController } from "../controllers/GraphController";
import { ToolType } from "../controllers/TransformController";
import { Tool } from "./Tool";

interface EdgeInfo {
    edge: GraphEdge;
    origMaterial: StandardMaterial;
}

export class RouteCreateTool extends Tool {
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;
    private readonly graphController: GraphController;
    private hovered: EdgeInfo = {
        edge: undefined,
        origMaterial: undefined
    };
    private selected: EdgeInfo = {
        edge: undefined,
        origMaterial: undefined
    };

    constructor(sceneService: SceneService, materialStore: MaterialStore, graphService: GraphService, graphController: GraphController) {
        super(sceneService, ToolType.ROUTE_CREATE);
        this.materialStore = materialStore;
        this.graphService = graphService;
        this.graphController = graphController;
    }

    awake() {
        const materialHovered = new StandardMaterial(MaterialName.ROUTE_EDGE_HOVERED, this.sceneService.scene);
        materialHovered.diffuseColor = Color3.Yellow();

        const materialSelected = new StandardMaterial(MaterialName.ROUTE_EDGE_SELECTED, this.sceneService.scene);
        materialSelected.diffuseColor = Color3.Green();

        this.materialStore.addMaterial(MaterialName.ROUTE_EDGE_HOVERED, materialHovered);
        this.materialStore.addMaterial(MaterialName.ROUTE_EDGE_SELECTED, materialSelected);
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
            this.hoverEdge(edge);
        } else {
            this.unHoverEdge();
        }
    }

    up() {
        if (this.hovered.edge) {
            if (this.selectEdge()) {
                this.graphController.edge = this.selected.edge;
            }
        } else {
            if (this.unSelectEdge()) {
                this.graphController.edge = undefined;
            }
        }
    }

    keyDown(keyName: KeyName) {
        if (keyName === KeyName.ESCAPE) {
            this.unSelectEdge();
            this.graphController.edge = undefined;
        } else if (keyName === KeyName.DELETE) {

        }
    }

    deselect() {
        this.unHoverEdge();
        this.unSelectEdge();
    }

    private hoverEdge(edge: GraphEdge) {
        if (this.hovered.edge !== edge && this.selected.edge !== edge) {
            this.unHoverEdge();
            this.hovered.edge = edge;
            this.hovered.origMaterial = <StandardMaterial> edge.mesh.material;

            edge.mesh.material = this.materialStore.getMaterialByName(MaterialName.ROUTE_EDGE_HOVERED);
        }
    }

    private unHoverEdge() {
        if (this.hovered.edge) {
            if ((!this.selected.edge || this.selected.edge !== this.hovered.edge)) {
                this.hovered.edge.mesh.material = this.hovered.origMaterial;
            }
            this.hovered.edge = undefined;
            this.hovered.origMaterial = undefined;
        }
    }

    private selectEdge(): boolean {
        this.unSelectEdge();
        this.selected.edge = this.hovered.edge;
        this.selected.origMaterial = this.hovered.origMaterial;

        this.selected.edge.mesh.material = this.materialStore.getMaterialByName(MaterialName.ROUTE_EDGE_SELECTED);

        return true;
    }

    private unSelectEdge(): boolean {
        if (this.selected.edge) {
            if (this.hovered.edge !== this.selected.edge) {
                this.selected.edge.mesh.material = this.selected.origMaterial;
            }

            this.selected.edge = undefined;
            this.selected.origMaterial = undefined;
            return true;
        }

        return false;
    }

    private getClosestLine(point: Vector2): [number, GraphEdge] {
        const edges = this.graphService.getGraph().edges;

        const edgeDistances: [number, GraphEdge][] = edges.map(edge => [edge.line.getMinDistance(point), edge]);
        edgeDistances.sort((a, b) => a[0] - b[0]);
        return edgeDistances[0];
    }
}