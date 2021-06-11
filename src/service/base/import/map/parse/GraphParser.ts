import { GraphEdge } from "../../../../graph/GraphEdge";
import { GraphImpl, GraphVertex } from "../../../../graph/GraphImpl";
import { RouteConfig, RouteParser } from "../RouteParser";
import { WorldMap } from "../WorldMap";
import { EdgeDimensionCalc } from "./EdgeDimensionCalc";

export class GraphParser {

    private readonly routeParser: RouteParser;
    private readonly edgeDimensionCalc: EdgeDimensionCalc;
    private edges: GraphEdge[] = [];
    private vertices: GraphVertex[] = [];
    private charToVertex: Map<string, GraphVertex> = new Map();

    constructor() {
        this.routeParser = new RouteParser();
        this.edgeDimensionCalc = new EdgeDimensionCalc();
    }

    parse(json: WorldMap): GraphImpl {
        this.vertices = [];
        this.edges = [];

        const routeConfigs = this.routeParser.parse(json);
        this.parseRouteConfigs(routeConfigs);
        this.parseAdditionalRouteEdges(json);

        const graph = new GraphImpl(this.vertices, this.edges);
        this.parseEdgeThickness(json, graph);
        return graph;
    }

    private parseEdgeThickness(worldMap: WorldMap, graph: GraphImpl) {
        const edgeThicknesses = worldMap.edgeThickness;

        edgeThicknesses.forEach(edgeThickness => {
            const [vertex1Id, vertex2Id] = edgeThickness.edgeRef.split('-');

            const edge = graph.edgeBetween(graph.getById(vertex1Id), graph.getById(vertex2Id));
            edge.thickness = edgeThickness.thickness;
        });

        graph.edges.forEach(edge => edge.dimensions = this.edgeDimensionCalc.calc(edge));
    }

    private parseRouteConfigs(routeConfigs: RouteConfig[]) {
        routeConfigs.forEach(routeConfig => this.parseRouteConfig(routeConfig));
    }

    private parseRouteConfig(routeConfig: RouteConfig) {
        const vertices = routeConfig.positions.map(pos => {
            const vertexId = routeConfig.char + pos.index;
            const vertex = new GraphVertex(vertexId, pos.pos); 
            this.charToVertex.set(vertexId, vertex);

            return vertex;
        });

        const edges: GraphEdge[] = [];

        for (let i = 0; i < vertices.length - 1; i++) {
            edges.push(new GraphEdge(vertices[i], vertices[i + 1]));
        }

        this.vertices.push(...vertices);
        this.edges.push(...edges);
    }

    private parseAdditionalRouteEdges(json: WorldMap) {
        json.routeEdges.forEach(([vertexKey1, vertexKey2]) => {
            const vertex1 = this.getVertexFromMap(vertexKey1);
            const vertex2 = this.getVertexFromMap(vertexKey2);
            
            this.edges.push(new GraphEdge(vertex1, vertex2));
        });
    }

    private getVertexFromMap(key: string): GraphVertex {
        if (!this.charToVertex.has(key)) {
            throw new Error(`Vertex with key ${key} does not exist.`);
        }

        return this.charToVertex.get(key);
    }
}