import { PathShapeType } from "../../../model/math/path/PathShape";
import { PathShapeFactory } from "../../../model/math/path/PathShapeFactory";
import { EdgeColor, EdgeDirection, GraphEdge } from "../../graph/GraphEdge";
import { GraphService } from "../../graph/GraphService";
import { RenderGuiService } from "../../RenderGuiService";
import { RouteTool } from "../tools/RouteTool";
import { ToolController } from "./ToolController";
import { ToolType } from "./TransformController";

export class GraphController {

    private readonly renderGuiService: RenderGuiService;
    private readonly graphService: GraphService;
    private readonly pathShapeFactory: PathShapeFactory;
    private readonly toolController: ToolController;
    private readonly routeTool: RouteTool;
    private _edge: GraphEdge;

    constructor(renderGuiService: RenderGuiService, graphService: GraphService, toolController: ToolController, routeTool: RouteTool) {
        this.renderGuiService = renderGuiService;
        this.graphService = graphService;
        this.toolController = toolController;
        this.routeTool = routeTool;
        this.onEdgeSelected = this.onEdgeSelected.bind(this);
        this.routeTool.onEdgeSelected(this.onEdgeSelected);
        this.pathShapeFactory = new PathShapeFactory();
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
            this.graphService.getVisualizer().visualizeEdge(this.edge, true, edge => edge.color);
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

    get shape(): PathShapeType {
        if (this.edge) {
            return this.edge.shape.type;
        }
    }

    set shape(shape: PathShapeType) {
        if (this.edge) {
            this.edge.shape = this.pathShapeFactory.create(this.edge, shape);
            this.routeTool.updateEdge();
            this.graphService.getVisualizer().visualizeEdge(this.edge, true, edge => edge.color);
            this.renderGuiService.render();
        }
    }

    deleteEdge() {
        if (this.edge) {
            this.toolController.getToolByType(ToolType.ROUTE).cancel();
            this.edge.mesh.dispose();
            this.graphService.getGraph().removeEdge(this.edge, true);
        }
    }

    private onEdgeSelected(edge: GraphEdge) {
        this.edge = edge;
    }
}