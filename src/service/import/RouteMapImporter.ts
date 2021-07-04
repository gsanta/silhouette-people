import { Vector3 } from "babylonjs";
import { EdgeColor, EdgeDirection, GraphEdge } from "../graph/GraphEdge";
import { GraphImpl, GraphVertex } from "../graph/GraphImpl";
import { GraphService } from "../graph/GraphService";

export interface EdgeJson {
    v1: number;
    v2: number;
    thickness: number;
    color: string;
    direction: string;
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

    constructor(graphService: GraphService) {
        this.graphService = graphService;
    }

    import(routeJson: RouteMapJson) {
        const vertices = routeJson.vertices.map(vertex => new GraphVertex(vertex.id, new Vector3(vertex.x, 0, vertex.y)));
        const edges = routeJson.edges.map(edgeJson => {
            const edge = new GraphEdge(vertices[edgeJson.v1], vertices[edgeJson.v2], undefined, edgeJson.thickness, false);
            edge.color = <EdgeColor> edgeJson.color;
            edge.direction = EdgeDirection.getDirectionFromEnum(<EdgeDirection> edgeJson.direction, edge);
            return edge;
        });

        this.graphService.setGraph(new GraphImpl(vertices, edges));
    }
}