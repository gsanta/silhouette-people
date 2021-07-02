import { Vector3 } from "babylonjs/Maths/math.vector";
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
    vertices: Set<GraphVertex>;
    edges: GraphEdge[];

    private vertexPairs: Map<GraphVertex, Set<GraphVertex>> = new Map();
    private edgeMap: Map<GraphVertex, GraphEdge[]> = new Map();

    constructor(vertices: GraphVertex[], edges: GraphEdge[]) {
        this.vertices = new Set(vertices);
        this.edges = edges;

        this.createEdgeList();
    }

    addEdge(edge: GraphEdge) {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);
            this.vertices.add(edge.v1);
            this.vertices.add(edge.v2);
        }
    }
    
    edgeBetween(v1: GraphVertex, v2: GraphVertex): GraphEdge {
        if (this.vertexPairs.get(v1).has(v2)) {
            const edges = this.edgeMap.get(v1);
            return edges.find(edge => edge.getOtherVertex(v1) === v2);
        }
    }

    getById(id: string): GraphVertex {
        return Array.from(this.vertices).find(vertex => vertex.id === id);
    }

    getNeighbours(vertex: GraphVertex): Set<GraphVertex> {
        return this.vertexPairs.get(vertex);
    }

    getEdges(vertex: GraphVertex): GraphEdge[] {
        return this.edges.filter(edge => edge.v1 === vertex || edge.v2 === vertex);
    }

    removeEdge(edge: GraphEdge) {

        [edge.v1, edge.v2].forEach(vertex => {
            if (this.vertexPairs.get(vertex).size <= 1) {
                this.vertexPairs.delete(vertex);
                this.edgeMap.delete(vertex);
                this.vertices.delete(vertex);
            } else {
                this.vertexPairs.get(vertex).delete(vertex);
                this.edgeMap.set(vertex, this.edgeMap.get(vertex).filter(edge => edge !== edge));
            }
        });

        this.edges = this.edges.filter(e => e !== edge);
    }

    size(): number {
        return this.edges.length;
    }

    private createEdgeList() {
        this.vertices.forEach(vertex => this.vertexPairs.set(vertex, new Set()));
        this.vertices.forEach(vertex => this.edgeMap.set(vertex, []));

        this.edges.forEach(edge => {
            const {v1, v2} = edge;
            this.vertexPairs.get(v1).add(v2);
            this.vertexPairs.get(v2).add(v1);
            this.edgeMap.get(edge.v1).push(edge);
            this.edgeMap.get(edge.v2).push(edge);
        });
    }
}