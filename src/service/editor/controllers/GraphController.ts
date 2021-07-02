import { MaterialStore } from "../../../store/MaterialStore";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { RenderGuiService } from "../../RenderGuiService";
import { ToolController } from "./ToolController";
import { ToolType } from "./TransformController";


export class GraphController {

    private _edge: GraphEdge;
    private readonly renderGuiService: RenderGuiService;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;
    private readonly toolController: ToolController;

    constructor(renderGuiService: RenderGuiService, graphService: GraphService, materialStore: MaterialStore, toolController: ToolController) {
        this.renderGuiService = renderGuiService;
        this.graphService = graphService;
        this.materialStore = materialStore;
        this.toolController = toolController;
    }

    set edge(graphEdge: GraphEdge) {
        if (graphEdge !== this.edge) {
            this._edge = graphEdge;
            this.renderGuiService.render();
        }
    }

    get edge(): GraphEdge {
        return this._edge;
    }

    set thickness(thickness: number) {
        if (this.edge) {
            this.edge.thickness = thickness;
            this.graphService.getVisualizer().visualizeEdge(this.edge, this.materialStore.getPathMaterial());
            this.renderGuiService.render();
        }
    }

    get thickness() {
        if (this.edge) {
            return this.edge.thickness;
        }
    }

    set vertex1Id(id: string) {
        this.edge.v1.id = id;
        this.renderGuiService.render();
    }

    get vertex1Id() {
        return this.edge.v1.id;
    }

    set vertex2Id(id: string) {
        this.edge.v2.id = id;
        this.renderGuiService.render();
    }

    get vertex2Id() {
        return this.edge.v2.id;
    }

    deleteEdge() {
        if (this.edge) {
            this.toolController.getToolByType(ToolType.ROUTE).cancel();
            this.edge.mesh.dispose();
            this.graphService.getGraph().removeEdge(this.edge);
        }
    }
}