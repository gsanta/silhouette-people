import { Vector3 } from "babylonjs/Maths/math.vector";
import { GenericGraph, GenericGraphConfig } from "./GenericGraph";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";

export class GraphVertex {
    readonly p: Vector3;
    id: string;

    constructor(id: string, p: Vector3) {
        this.id = id;
        this.p = p;
    }

    toString() {
        return this.p.toString();
    }
}

export class GraphImpl implements Graph<GraphVertex, GraphEdge> {
    private genericGraph: GenericGraph<GraphVertex, GraphEdge>;

    constructor(vertices: GraphVertex[], edges: GraphEdge[]) {

        const genericGraphConfig: GenericGraphConfig<GraphVertex, GraphEdge> = {
            getVertices: (edge) => [edge.v1, edge.v2]
        }
        this.genericGraph = new GenericGraph(vertices, edges, genericGraphConfig);
    }

    addEdge(edge: GraphEdge) {
        this.genericGraph.addEdge(edge);
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