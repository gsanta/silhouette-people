import { Vector3 } from "babylonjs";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphVertex } from "../../graph/GraphImpl";
import { GraphService } from "../../graph/GraphService";
import { KeyName } from "../../input/KeyboardService";
import { SceneService } from "../../SceneService";
import { ToolType } from "../controllers/TransformController";
import { Tool } from "./Tool";

export class RouteCreateTool extends Tool {
    private readonly graphService: GraphService;

    private edge: GraphEdge;

    constructor(sceneService: SceneService, graphService: GraphService) {
        super(sceneService, ToolType.ROUTE_CREATE);
        this.graphService = graphService;
    }

    move(cursorPos: Vector3) {
        if (this.edge && cursorPos) {
            const p = new Vector3(cursorPos.x, GraphEdge.yPos, cursorPos.z);
            this.edge.v2 = new GraphVertex(undefined, p);
            this.graphService.getVisualizer().updateEdge(this.edge);
        }
    }

    up(cursorPos: Vector3) {
        if (this.edge) {
            this.finishEdge();
        } else {
            this.startEdge(cursorPos);
        }
    }

    keyDown(keyName: KeyName) {
        if (keyName === KeyName.ESCAPE) {
            this.cancel();
        } else if (keyName === KeyName.DELETE) {

        }
    }

    deselect() {
        this.cancel();
    }

    private startEdge(cursorPos: Vector3) {
        if (cursorPos) {
            const p = new Vector3(cursorPos.x, GraphEdge.yPos, cursorPos.z);
            this.edge = new GraphEdge(new GraphVertex(undefined, p), new GraphVertex(undefined, p));
            this.graphService.getVisualizer().visualizeEdge(this.edge, true, edge => edge.color);
        }
    }

    private finishEdge() {
        const graph = this.graphService.getGraph();
        const closestVertForV1 = this.findClosestVertex(this.edge.v1.p);
        const closestVertForV2 = this.findClosestVertex(this.edge.v2.p);

        if (closestVertForV1[0] < 0.5) {
            this.edge.v1 = closestVertForV1[1];
        } else {
            graph.addVertex(this.edge.v1);
        }

        if (closestVertForV2[0] < 0.5) {
            this.edge.v2 = closestVertForV2[1];
        } else {
            graph.addVertex(this.edge.v2);
        }

        const edge = new GraphEdge(this.edge.v1, this.edge.v2, this.graphService.getGraph(), 0);
        graph.addEdge(edge);

        this.graphService.getVisualizer().visualizeEdge(edge, true, edge => edge.color);

        this.edge.mesh.dispose();
        this.edge = undefined;
    }

    cancel() {
        if (this.edge) {
            this.edge.mesh.dispose();
            this.edge = undefined;
        }
    }

    private findClosestVertex(vertex: Vector3): [number, GraphVertex] {
        const vertices = Array.from(this.graphService.getGraph().vertices);

        const vertexDistances: [number, GraphVertex][] = vertices.map(v => [v.p.subtract(vertex).length(), v]);
        vertexDistances.sort((a, b) => a[0] - b[0]);
        return vertexDistances[0];
    }
}