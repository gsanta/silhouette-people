import { Vector3 } from "babylonjs";
import { LinePathShape } from "../../model/math/path/LinePathShape";
import { PathShapeFactory } from "../../model/math/path/PathShapeFactory";
import { EdgeColor, EdgeDirection, GraphEdge } from "../graph/GraphEdge";
import { GraphImpl, GraphVertex } from "../graph/GraphImpl";
import { GraphService } from "../graph/GraphService";

export interface EdgeJson {
    v1: number;
    v2: number;
    thickness: number;
    color: string;
    direction: string;
    internalControlPoints: {x: number, y: number, z: number}[];
}

export interface RouteMapJson {
    vertices: {
        x: number;
        y: number;
        id: string;
    }[];
    edges: EdgeJson[];
}

export class RouteMapImporter {

    private readonly graphService: GraphService;
    private readonly pathShapeFactory: PathShapeFactory;

    constructor(graphService: GraphService) {
        this.graphService = graphService;
        this.pathShapeFactory = new PathShapeFactory();
    }

    import(routeJson: RouteMapJson) {
        const vertices = routeJson.vertices.map(vertex => new GraphVertex(vertex.id, new Vector3(vertex.x, 0, vertex.y)));
        const edges = routeJson.edges.map(edgeJson => {
            const edge = new GraphEdge(vertices[edgeJson.v1], vertices[edgeJson.v2], undefined, edgeJson.thickness, false);
            const controlPoints = [edge.v1.p, ...edgeJson.internalControlPoints.map(p => new Vector3(p.x, p.y, p.z)), edge.v2.p];
            edge.shape = this.pathShapeFactory.createFromControlPoints(edge, controlPoints);
            edge.color = <EdgeColor> edgeJson.color || EdgeColor.GRAY;
            edge.direction = EdgeDirection.getDirectionFromEnum(<EdgeDirection> edgeJson.direction, edge);
            return edge;
        });

        this.graphService.setGraph(new GraphImpl(vertices, edges));
    }
}