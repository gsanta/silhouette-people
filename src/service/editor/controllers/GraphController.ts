import { MaterialStore } from "../../../store/MaterialStore";
import { EdgeColor, GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { RenderGuiService } from "../../RenderGuiService";
import { ToolController } from "./ToolController";
import { ToolType } from "./TransformController";


export enum EdgeDirection {
    V1_V2 = 'v1 to v2',
    V2_V1 = 'v2 to v1',
    UNDIRECTED = 'undirected'
}

export class GraphController {

    private readonly renderGuiService: RenderGuiService;
    private readonly graphService: GraphService;
    private readonly materialStore: MaterialStore;
    private readonly toolController: ToolController;
    private _edge: GraphEdge;

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

    set direction(direction: EdgeDirection) {
        if (this.edge) {
            switch(direction) {
                case EdgeDirection.V1_V2:
                    this.edge.direction = [this.edge.v1, this.edge.v2];
                break;
                case EdgeDirection.V2_V1:
                    this.edge.direction = [this.edge.v2, this.edge.v1];
                break;
                default:
                    this.edge.direction = undefined;
                break;
            }
            this.renderGuiService.render();
        }
    }

    get direction(): EdgeDirection {
        if (this.edge) {
            const direction = this.edge.direction;

            if (!direction) {
                return EdgeDirection.UNDIRECTED;
            } else if (direction[0] === this.edge.v1) {
                return EdgeDirection.V1_V2;
            } else {
                return EdgeDirection.V2_V1;
            }
        }
    }

    set color(color: EdgeColor) {
        if (this.edge) {
            this.edge.color = color;
            this.renderGuiService.render();
        }
    }

    get color(): EdgeColor {
        return this.edge.color;
    }

    deleteEdge() {
        if (this.edge) {
            this.toolController.getToolByType(ToolType.ROUTE).cancel();
            this.edge.mesh.dispose();
            this.graphService.getGraph().removeEdge(this.edge, true);
        }
    }
}