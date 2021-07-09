import { Color3, Matrix, Mesh, StandardMaterial, Vector2, MeshBuilder, Vector3, PointerDragBehavior, Observer } from "babylonjs";
import { toVector2 } from "../../../helpers";
import { MaterialName, MaterialStore } from "../../../store/MaterialStore";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphVertex } from "../../graph/GraphImpl";
import { GraphService } from "../../graph/GraphService";
import { KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";
import { GizmoManagerAdapter } from "./GizmoManagerAdapter";
import { Tool } from "./Tool";

interface EdgeInfo {
    edge: GraphEdge;
}

export class RouteTool extends Tool {
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;
    private readonly gizmoManagerAdapter: GizmoManagerAdapter;
    private onEdgeSelectedCallbacks: ((edge: GraphEdge) => void)[] = [];

    private activeAnchor: MoveAnchor;
    private moveAnchors: MoveAnchor[] = [];

    private xObserver: Observer<any>;
    private zObserver: Observer<any>;

    private hovered: EdgeInfo = {
        edge: undefined,
    };
    private selected: EdgeInfo = {
        edge: undefined,
    };

    constructor(
        sceneService: SceneService,
        materialStore: MaterialStore,
        graphService: GraphService,
        gizmoManagerAdapter: GizmoManagerAdapter
    ) {
        super(sceneService, ToolType.ROUTE);
        this.materialStore = materialStore;
        this.graphService = graphService;
        this.gizmoManagerAdapter = gizmoManagerAdapter;
        this.onAnchorAttach = this.onAnchorAttach.bind(this);
        this.dragObservable = this.dragObservable.bind(this);
    }

    awake() {
        const materialHovered = new StandardMaterial(MaterialName.ROUTE_EDGE_HOVERED, this.sceneService.scene);
        materialHovered.diffuseColor = Color3.Yellow();
        this.materialStore.addMaterial(MaterialName.ROUTE_EDGE_HOVERED, materialHovered);

        const materialSelected = new StandardMaterial(MaterialName.ROUTE_EDGE_SELECTED, this.sceneService.scene);
        materialSelected.diffuseColor = Color3.Blue();
        this.materialStore.addMaterial(MaterialName.ROUTE_EDGE_SELECTED, materialSelected);
    }

    move() {
        const scene = this.sceneService.scene;
        let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), null);
        let hit = scene.pickWithRay(ray, (mesh) => {
            return mesh.name.startsWith('ground');
        });
        const p = hit.pickedPoint;

        const moveAnchor = this.findMoveAnchorWithinRangeIfExists(p);

        if (moveAnchor) {
            this.hoverEdge(this.selected.edge);
        } else if (!this.activeAnchor) {
            const edge = this.findEdgeWithinRangeIfExists(toVector2(p));

            if (edge) {
                this.hoverEdge(edge);
            } else {
                this.unHoverEdge();
            }
        }
    }

    up() {
        if (this.hovered.edge) {
            if (this.selectEdge()) {
                this.onEdgeSelectedCallbacks.forEach(callback => callback(this.selected.edge));
            }
        }
    }

    keyDown(keyName: KeyName) {
        if (keyName === KeyName.ESCAPE) {
            this.unSelectEdge();
            this.onEdgeSelectedCallbacks.forEach(callback => callback(undefined));
        } else if (keyName === KeyName.DELETE) {

        }
    }

    select() {
        this.gizmoManagerAdapter.manager.positionGizmoEnabled = true;
        this.gizmoManagerAdapter.setMeshFilter((mesh: Mesh) => mesh.name.startsWith('anchor'));
        this.xObserver = this.gizmoManagerAdapter.manager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragObservable.add(this.dragObservable);
        // this.yObserver = this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragObservable.add(this.dragObservable);
        this.zObserver = this.gizmoManagerAdapter.manager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragObservable.add(this.dragObservable);

        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.isEnabled = false;
        this.gizmoManagerAdapter.onAttach(this.onAnchorAttach);
    }

    deselect() {
        this.unHoverEdge();
        this.unSelectEdge();
        this.gizmoManagerAdapter.removeMeshFilter();
        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragObservable.remove(this.xObserver);
        // this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragObservable.remove(this.yObserver);
        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragObservable.remove(this.zObserver);
        this.gizmoManagerAdapter.manager.gizmos.positionGizmo.yGizmo.isEnabled = true;
        this.gizmoManagerAdapter.removeOnAttach(this.onAnchorAttach);
    }

    cancel() {
        this.unSelectEdge();
    }

    onEdgeSelected(callback: (edge: GraphEdge) => void) {
        this.onEdgeSelectedCallbacks.push(callback);
    }

    updateEdge() {
        this.createMoveAnchors();
    }

    private hoverEdge(edge: GraphEdge) {
        if (this.hovered.edge !== edge && this.selected.edge !== edge) {
            this.unHoverEdge();
            this.hovered.edge = edge;

            this.graphService.getVisualizer().updateEdgeColor(edge, () => MaterialName.ROUTE_EDGE_HOVERED);
        }
    }

    private unHoverEdge() {
        if (this.hovered.edge) {
            if ((!this.selected.edge || this.selected.edge !== this.hovered.edge)) {
                this.graphService.getVisualizer().updateEdgeColor(this.hovered.edge, (edge) => edge.color);
            }
            this.hovered.edge = undefined;
        }
    }

    private selectEdge(): boolean {
        this.unSelectEdge();
        this.selected.edge = this.hovered.edge;

        this.graphService.getVisualizer().updateEdgeColor(this.selected.edge, () => MaterialName.ROUTE_EDGE_SELECTED);

        this.createMoveAnchors();
        return true;
    }

    private unSelectEdge(): boolean {
        if (this.selected.edge) {
            this.disposeAnchors();

            this.graphService.getVisualizer().updateEdgeColor(this.selected.edge, (edge) => edge.color);
            this.selected.edge = undefined;
            this.onEdgeSelectedCallbacks.forEach(callback => callback(undefined));
            return true;
        }

        return false;
    }

    private findEdgeWithinRangeIfExists(point: Vector2): GraphEdge {
        const edges = this.graphService.getGraph().edges;

        const edgeDistances: [number, GraphEdge][] = edges.map(edge => [edge.line.getMinDistance(point), edge]);
        edgeDistances.sort((a, b) => a[0] - b[0]);
        
        if (edgeDistances[0][0] < 0.5) {
            return edgeDistances[0][1];
        }

        return undefined;
    }

    private findMoveAnchorWithinRangeIfExists(point: Vector3): MoveAnchor {
        if (!this.selected.edge) { return undefined; }

        const dist = (anchorPos: Vector3) => Math.sqrt(Math.pow(point.x - anchorPos.x, 2) + Math.pow(point.z - anchorPos.z, 2));
        return this.moveAnchors.find(anchor => dist(anchor.mesh.getAbsolutePosition()) < 0.5);
    }

    private disposeAnchors() {
        this.moveAnchors.forEach(moveAnchor => moveAnchor.dispose());
        this.moveAnchors = [];
        this.activeAnchor = undefined;
    }

    private dragObservable() {
        if (this.activeAnchor) {
            this.activeAnchor.update();
        }
    }

    private onAnchorAttach(mesh: Mesh) {
        if (this.selected.edge) {
            const anchor = this.moveAnchors.find(anchor => anchor.mesh === mesh);

            if (anchor) {
                this.activeAnchor = anchor;
                this.unHoverEdge();
            } else {
                this.activeAnchor = undefined;
            }
        }
    }

    private createMoveAnchors() {
        this.activeAnchor = undefined;
        this.moveAnchors.forEach(anchor => anchor.dispose());
        const controlPoints = this.selected.edge.shape.controlPoints;

        this.moveAnchors = controlPoints.map((controlPoint, i) => new MoveAnchor(controlPoint, i, new AnchorUpdater(i, this.selected.edge, this.graphService)));
    }
}

class AnchorUpdater {
    private readonly controlPointIndex: number;
    private readonly edge: GraphEdge;
    private readonly graphService: GraphService; 

    constructor(controlPointIndex: number, edge: GraphEdge, graphService: GraphService) {
        this.controlPointIndex = controlPointIndex;
        this.edge = edge;
        this.graphService = graphService;
    }

    updateAnchor(p: Vector3) {
        const shape = this.edge.shape;

        if (this.controlPointIndex === 0) {
            this.updateVertexAnchor(p, this.edge.v1);
        } else if (this.controlPointIndex === shape.controlPoints.length - 1) {
            this.updateVertexAnchor(p, this.edge.v2);
        } else {
            this.updateControlPointAnchor(p);
        }
    }

    private updateControlPointAnchor(p: Vector3) {
        const shape = this.edge.shape;

        shape.update(this.controlPointIndex, p);
        this.graphService.getVisualizer().updateEdge(this.edge);
    }

    private updateVertexAnchor(p: Vector3, vertex: GraphVertex) {
        const newVertex = new GraphVertex(vertex.id, p);

        const edges = this.graphService.getGraph().getEdges(vertex);

        edges.forEach(edge => {
            if (vertex === edge.v1) {
                edge.v1 = newVertex;
            } else {
                edge.v2 = newVertex;
            }
            this.graphService.getGraph().replaceVertex(vertex, newVertex);
            this.graphService.getVisualizer().updateEdge(edge);
        });
    }
}

class MoveAnchor {
    readonly mesh: Mesh;
    private p: Vector3;
    private anchorUpdater: AnchorUpdater;

    constructor(p: Vector3, anchorIndex: number, anchorUpdater?: AnchorUpdater) {
        this.p = p;
        this.anchorUpdater = anchorUpdater;
        this.mesh = this.getAnchorMesh(`anchor-${anchorIndex}`);
    }

    update() {
        const meshPos = this.mesh.getAbsolutePosition();
        this.p = new Vector3(meshPos.x, this.p.y, meshPos.z);

        this.anchorUpdater.updateAnchor(this.p);
    }

    dispose() {
        this.mesh.dispose();
    }

    private getAnchorMesh(name: string) {
        const mesh = MeshBuilder.CreateSphere(name, { diameter: 0.3 });
        mesh.setAbsolutePosition(this.p.clone());
        return mesh; 
    }
}