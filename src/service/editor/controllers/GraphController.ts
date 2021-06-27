import { MaterialStore } from "../../../store/MaterialStore";
import { GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { RenderGuiService } from "../../RenderGuiService";


export class GraphController {

    private _edge: GraphEdge;
    private readonly renderGuiService: RenderGuiService;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;

    constructor(renderGuiService: RenderGuiService, graphService: GraphService, materialStore: MaterialStore) {
        this.renderGuiService = renderGuiService;
        this.graphService = graphService;
        this.materialStore = materialStore;
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

    deleteEdge() {
        if (this.edge) {
            this.edge.mesh.dispose();
            this.graphService.getGraph().removeEdge(this.edge);
        }
    }
}