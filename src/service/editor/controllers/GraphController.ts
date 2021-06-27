import { GraphEdge } from "../../graph/GraphEdge";
import { RenderGuiService } from "../../RenderGuiService";


export class GraphController {

    private _edge: GraphEdge;
    private readonly renderGuiService: RenderGuiService;

    constructor(renderGuiService: RenderGuiService) {
        this.renderGuiService = renderGuiService;
    }

    set edge(graphEdge: GraphEdge) {
        this._edge = graphEdge;
        this.renderGuiService.render();
    }

    get edge(): GraphEdge {
        return this._edge;
    }

    set thickness(thickness: number) {
        if (this.edge) {
            this.edge.thickness = thickness;
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
            
        }
    }
}