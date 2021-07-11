import { Vector3 } from "babylonjs/Maths/math.vector";
import { GenericGraph, GenericGraphConfig } from "./GenericGraph";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";

export class GraphVertex {
    p: Vector3;
    id: string;

    constructor(id: string, p: Vector3) {
        this.id = id;
        this.p = p;
    }

    toString() {
        return this.p.toString();
    }
}

class IdGenerator {
    private readonly graph: GraphImpl;
    private readonly idRegex = /v-(\d+)/;

    constructor(graph: GraphImpl) {
        this.graph = graph;
    }

    generateId(): string {
        const vertices = Array.from(this.graph.vertices);

        if (vertices.length > 0) {
            const indexes = vertices
                .filter(v => v.id && v.id.match(this.idRegex))
                .map(v => parseInt(v.id.match(this.idRegex)[1]));
            indexes.sort((a, b) => b - a);
    
            return `v-${indexes[0] + 1}`;
        } else {
            return `v-0`;
        }
    }
}

export class GraphImpl implements Graph<GraphVertex, GraphEdge> {
    private readonly genericGraph: GenericGraph<GraphVertex, GraphEdge>;
    private readonly idGenerator: IdGenerator;

    constructor(vertices: GraphVertex[], edges: GraphEdge[]) {

        const genericGraphConfig: GenericGraphConfig<GraphVertex, GraphEdge> = {
            getVertices: (edge) => edge.direction ? edge.direction : [edge.v1, edge.v2],
            isBidirectional: (edge) => !edge.direction
        }
        this.genericGraph = new GenericGraph(vertices, edges, genericGraphConfig);

        this.edges.forEach(edge => edge.graph = this);
        this.idGenerator = new IdGenerator(this);
    }

    addVertex(vertex: GraphVertex) {
        this.genericGraph.addVertex(vertex);
        if (!vertex.id) {
            vertex.id = this.idGenerator.generateId();
        }
    }

    addEdge(edge: GraphEdge) {
        this.genericGraph.addEdge(edge);
        edge.graph = this;
    }
    
    edgeBetween(v1: GraphVertex, v2: GraphVertex): GraphEdge {
        return this.genericGraph.edgeBetween(v1, v2);
    }

    getById(id: string): GraphVertex {
        return Array.from(this.vertices).find(vertex => vertex.id === id);
    }

    getNeighbours(vertex: GraphVertex): Set<GraphVertex> {
        return this.genericGraph.getNeighbours(vertex);
    }

    getEdges(vertex: GraphVertex): GraphEdge[] {
        return this.genericGraph.getEdges(vertex);
    }

    removeEdge(edge: GraphEdge, removeIsolatedVertex: boolean) {
        this.genericGraph.removeEdge(edge, removeIsolatedVertex);
    }

    updateDirection(edge: GraphEdge) {
        this.genericGraph.updateDirection(edge);
    }

    get vertices() {
        return this.genericGraph.vertices;
    }

    get edges() {
        return this.genericGraph.edges;
    }

    size(): number {
        return this.edges.length;
    }
}