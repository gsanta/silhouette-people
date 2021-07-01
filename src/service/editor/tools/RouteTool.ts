import { Color3, Matrix, Mesh, StandardMaterial, Vector2, MeshBuilder, Vector3, PointerDragBehavior, Observer } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { MaterialName, MaterialStore } from "../../../store/MaterialStore";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphVertex } from "../../graph/GraphImpl";
import { GraphService } from "../../graph/GraphService";
import { KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { GraphController } from "../controllers/GraphController";
import { ToolType } from "../controllers/TransformController";
import { GizmoManagerAdapter } from "./GizmoManagerAdapter";
import { Tool } from "./Tool";

interface EdgeInfo {
    edge: GraphEdge;
    origMaterial: StandardMaterial;
}

export class RouteTool extends Tool {
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;
    private readonly graphController: GraphController;
    private readonly gizmoManagerAdapter: GizmoManagerAdapter;

    private vertex1Anchor: MoveAnchor;
    private vertex2Anchor: MoveAnchor;
    private activeAnchor: MoveAnchor;

    private xObserver: Observer<any>;

    private hovered: EdgeInfo = {
        edge: undefined,
        origMaterial: undefined
    };
    private selected: EdgeInfo = {
        edge: undefined,
        origMaterial: undefined
    };

    constructor(
        sceneService: SceneService,
        materialStore: MaterialStore,
        graphService: GraphService,
        graphController: GraphController,
        gizmoManagerAdapter: GizmoManagerAdapter
    ) {
        super(sceneService, ToolType.ROUTE);
        this.materialStore = materialStore;
        this.graphService = graphService;
        this.graphController = graphController;
        this.gizmoManagerAdapter = gizmoManagerAdapter;
        this.onAnchorAttach = this.onAnchorAttach.bind(this);
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
        const [dist, edge] = this.findClosestEdge(toVector2(p));

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
        }
    }

    keyDown(keyName: KeyName) {
        if (keyName === KeyName.ESCAPE) {
            this.unSelectEdge();
            this.graphController.edge = undefined;
        } else if (keyName === KeyName.DELETE) {

        }
    }

    select() {
        this.gizmoManagerAdapter.manager.positionGizmoEnabled = true;
        this.gizmoManagerAdapter.setMeshFilter((mesh: Mesh) => mesh.name.startsWith('anchor'));
        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragObservable.add(this.dragObservable);
        this.gizmoManagerAdapter.onAttach(this.onAnchorAttach);
        // this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragObservable.add(this.dragObservable);
        // this.gizmoManagerAdapter.manager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragObservable.add(this.dragObservable);
    }

    deselect() {
        this.unHoverEdge();
        this.unSelectEdge();

        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragObservable.remove(this.xObserver);
        this.gizmoManagerAdapter.removeOnAttach(this.onAnchorAttach);

        // this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragObservable.remove(this.dragObservable);
        // this.gizmoManagerAdapter.manager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragObservable.remove(this.dragObservable);
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

        this.vertex1Anchor = new MoveAnchor(this.selected.edge, this.selected.edge.v1, this.graphService);
        this.vertex2Anchor = new MoveAnchor(this.selected.edge, this.selected.edge.v2, this.graphService);

        return true;
    }

    private unSelectEdge(): boolean {
        if (this.selected.edge) {
            this.disposeAnchors();
            if (this.hovered.edge !== this.selected.edge) {
                this.selected.edge.mesh.material = this.selected.origMaterial;
            }

            this.selected.edge = undefined;
            this.selected.origMaterial = undefined;
            return true;
        }

        return false;
    }

    private findClosestEdge(point: Vector2): [number, GraphEdge] {
        const edges = this.graphService.getGraph().edges;

        const edgeDistances: [number, GraphEdge][] = edges.map(edge => [edge.line.getMinDistance(point), edge]);
        edgeDistances.sort((a, b) => a[0] - b[0]);
        return edgeDistances[0];
    }

    private disposeAnchors() {
        this.vertex1Anchor.dispose();
        this.vertex2Anchor.dispose();
        this.vertex1Anchor = undefined;
        this.vertex2Anchor = undefined;
    }

    private dragObservable() {
        if (this.activeAnchor) {
            this.activeAnchor.update();
        }
    }

    private onAnchorAttach(mesh: Mesh) {
        // if (!mesh) {
        //     this.activeAnchor = undefined;
        // } else {
            if (this.selected.edge) {
                this.activeAnchor = mesh === this.vertex1Anchor.mesh ? this.vertex1Anchor : this.vertex2Anchor;
            }
        // }
    }
}

class MoveAnchor {
    readonly mesh: Mesh;
    private readonly edge: GraphEdge;
    private readonly vertexId: 'v1' | 'v2';
    private readonly graphService: GraphService;
    private vertex: GraphVertex;

    constructor(edge: GraphEdge, vertex: GraphVertex, graphService: GraphService) {
        this.edge = edge;
        this.vertexId = vertex === edge.v1 ? 'v1' : 'v2';
        this.vertex = vertex;
        this.graphService = graphService;

        this.mesh = this.getAnchorMesh(vertex, `anchor-${this.vertexId}`);
    }

    update() {
        this.vertex = new GraphVertex(this.vertex.id, this.edge.mesh.getAbsolutePosition());
        if (this.vertexId === 'v1') {
            this.edge.v1 = this.vertex;
        } else {
            this.edge.v2 = this.vertex;
        }

        this.graphService.getVisualizer().updateEdge(this.edge);
    }

    dispose() {
        this.mesh.dispose();
    }

    private getAnchorMesh(vertex: GraphVertex, name: string) {
        const mesh = MeshBuilder.CreateSphere(name, { diameter: 0.2 });
        const p = new Vector3(vertex.p.x, this.edge.yPos, vertex.p.z);
        mesh.setAbsolutePosition(p);
        return mesh; 
    }
}