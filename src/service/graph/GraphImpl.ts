import { Vector3 } from "babylonjs/Maths/math.vector";
import { vector3ToRotation } from "../../helpers";
import { Quad } from "../../model/shape/Quad";
import { Graph } from "./Graph";

export class GraphEdge {
    readonly v1: GraphVertex;
    readonly v2: GraphVertex;
    thickness: number = 0;
    dimensions: Quad;

    private _direction: number;

    constructor(v1: GraphVertex, v2: GraphVertex) {
        this.v1 = v1;
        this.v2 = v2;

        this.setDirection();
    }

    hasVertex(v: GraphVertex) {
        return this.v1 === v || this.v2 === v;
    }

    getOtherVertex(v: GraphVertex) {
        if (v === this.v1) {
            return this.v2;
        } else if (v === this.v2) {
            return this.v1;
        }

        return undefined;
    }

    get direction(): number {
        return this._direction;
    }

    get oppositeDirection(): number {
        return this._direction + Math.PI;
    }

    getSource(isReversed = false): GraphVertex {
        return isReversed ? this.v2 : this.v1;
    }

    getTraget(isReversed = false): GraphVertex {
        return isReversed ? this.v1 : this.v2;
    }

    private setDirection(): void {
        const vector = this.v2.p.subtract(this.v1.p);
        this._direction = vector3ToRotation(vector);
    }

    toString() {
        return `[ ${this.v1.toString()} : ${this.v2.toString()} ]`;
    }
}

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
    readonly vertices: GraphVertex[];
    readonly edges: GraphEdge[];

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