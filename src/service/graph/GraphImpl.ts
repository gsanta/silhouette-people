import { Vector3 } from "babylonjs/Maths/math.vector";
import { vector3ToRotation } from "../../helpers";
import { Quad } from "../../model/math/shapes/Quad";
import { Graph } from "./Graph";
import { GraphEdge } from "./GraphEdge";

export class GraphVertex {
    readonly p: Vector3;
    readonly id: string;

    constructor(id: string, p: Vector3) {
        this.id = id;
        this.p = p;
    }

    toString() {
        return this.p.toString();
    }
}

export class GraphImpl implements Graph<GraphVertex, GraphEdge> {
    vertices: GraphVertex[];
    edges: GraphEdge[];

    private vertexPairs: Map<GraphVertex, Set<GraphVertex>> = new Map();
    private edgeMap: Map<GraphVertex, GraphEdge[]> = new Map();

    constructor(vertices: GraphVertex[], edges: GraphEdge[]) {
        this.vertices = vertices;
        this.edges = edges;

        this.createEdgeList();
    }
    
    edgeBetween(v1: GraphVertex, v2: GraphVertex): GraphEdge {
        if (this.vertexPairs.get(v1).has(v2)) {
            const edges = this.edgeMap.get(v1);
            return edges.find(edge => edge.getOtherVertex(v1) === v2);
        }
    }

    getByPos(pos: Vector3): GraphVertex {
        return this.vertices.find(vertex => vertex.p === pos);
    }

    getById(id: string): GraphVertex {
        return this.vertices.find(vertex => vertex.id === id);
    }

    getEdges(vertex: GraphVertex): GraphEdge[] {
        return this.edgeMap.get(vertex);
    }

    removeEdge(edge: GraphEdge) {

        [edge.v1, edge.v2].forEach(vertex => {
            if (this.vertexPairs.get(vertex).size <= 1) {
                this.vertexPairs.delete(vertex);
                this.edgeMap.delete(vertex);
                this.vertices = this.vertices.filter(v => v !== vertex);
            } else {
                this.vertexPairs.get(vertex).delete(vertex);
                this.edgeMap.set(vertex, this.edgeMap.get(vertex).filter(edge => edge !== edge));
            }
        });

        this.edges = this.edges.filter(e => e !== edge);
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