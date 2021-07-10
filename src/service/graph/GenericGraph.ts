import { Graph } from "./Graph";

export interface GenericGraphConfig<V, E> {
    getVertices(edge: E): [V, V];
    isBidirectional(edge: E): boolean;
}

export interface GenericGraphEdge<V> {
    v1: V;
    v2: V;
}

export class GenericGraph<V, E extends GenericGraphEdge<V>> implements Graph<V, E> {
    vertices: Set<V>;
    edges: E[];

    private readonly config: GenericGraphConfig<V, E>;

    private adjacencyList: Map<V, Set<V>> = new Map();
    private reverseAdjacencyList: Map<V, Set<V>> = new Map();
    private edgeMap: Map<V, E[]> = new Map();

    constructor(vertices: V[], edges: E[], config: GenericGraphConfig<V, E>) {
        this.vertices = new Set(vertices);
        this.edges = edges;
        this.config = config;

        this.createEdgeList();
    }

    addVertex(v: V) {
        if (!this.vertices.has(v)) {
            this.vertices.add(v);
            this.adjacencyList.set(v, new Set());
            this.reverseAdjacencyList.set(v, new Set());
        }
    }

    addEdge(edge: E) {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);

            const [v1, v2] = this.config.getVertices(edge);

            if (!this.vertices.has(v1)) { this.addVertex(v1); }
            if (!this.vertices.has(v2)) { this.addVertex(v2); }

            this.addEdgeVertex(v1, v2, edge, true);
            this.addEdgeVertex(v2, v1, edge, this.config.isBidirectional(edge));
        }
    }

    replaceVertex(oldV: V, newV: V): void {

        this.edges.forEach(edge => {
            if (edge.v1 === oldV) {
                edge.v1 = newV;
            } else if (edge.v2 === oldV) {
                edge.v2 = newV;
            }
        })

        this.vertices.delete(oldV);
        this.vertices.add(newV);
        const neighbours = this.adjacencyList.get(oldV);

        this.adjacencyList.delete(oldV);
        this.adjacencyList.set(newV, neighbours);

        const reverseNeighbours = this.reverseAdjacencyList.get(oldV) || new Set();
        this.reverseAdjacencyList.delete(oldV);
        this.reverseAdjacencyList.set(newV, reverseNeighbours);

        reverseNeighbours.forEach(pair => {
            this.adjacencyList.get(pair).delete(oldV);
            this.adjacencyList.get(pair).add(newV);
            this.reverseAdjacencyList.get(pair).delete(oldV);
            this.reverseAdjacencyList.get(pair).add(newV);
        });
    }

    private addEdgeVertex(v1: V, v2: V, edge: E, validDirection: boolean) {
        if (!this.vertices.has(v1)) {
            this.vertices.add(v1);
        }

        if (validDirection) {
            this.adjacencyList.get(v1).add(v2);
            this.reverseAdjacencyList.get(v2).add(v1);
        }

        if (!this.edgeMap.has(v1)) {
            this.edgeMap.set(v1, []);
        }

        this.edgeMap.get(v1).push(edge);
    }

    updateDirection(edge: E) {
        this.removeEdge(edge, false);
        this.addEdge(edge);
    }
    
    edgeBetween(v1: V, v2: V): E {
        if (this.adjacencyList.has(v1) && this.adjacencyList.get(v1).has(v2)) {
            const edges = this.edgeMap.get(v1);
            return edges.find(edge => {
                const [vertex1, vertex2] = this.config.getVertices(edge);
                return v2 === vertex1 || v2 === vertex2;
            });
        }
    }

    getNeighbours(vertex: V): Set<V> {
        return this.adjacencyList.has(vertex) ? this.adjacencyList.get(vertex) : new Set([]);
    }

    getEdges(vertex: V): E[] {
        return this.edges.filter(edge => {
            const vertices = this.config.getVertices(edge);
            return vertices[0] === vertex || vertices[1] === vertex;
        });
    }

    removeEdge(edge: E, removeIsolatedVertex: boolean) {
        const [v1, v2] = this.config.getVertices(edge);

        this.removeEdgeVertex(v1, v2, edge, removeIsolatedVertex);
        this.removeEdgeVertex(v2, v1, edge, removeIsolatedVertex);

        this.edges = this.edges.filter(e => e !== edge);
    }

    private removeEdgeVertex(vertex: V, otherVertex: V, edge: E, removeIsolatedVertex: boolean) {
        this.adjacencyList.get(vertex).delete(otherVertex);
        if (this.reverseAdjacencyList.has(otherVertex)) {
            this.reverseAdjacencyList.get(otherVertex).delete(vertex);
        }
        this.edgeMap.set(vertex, this.edgeMap.get(vertex).filter(e => e !== edge));

        
        if (removeIsolatedVertex) {
            if (!this.adjacencyList.has(vertex) || this.adjacencyList.get(vertex).size === 0) {
                this.vertices.delete(vertex);
                this.adjacencyList.delete(vertex);
                this.reverseAdjacencyList.delete(vertex);
            }
        }
    }

    size(): number {
        return this.edges.length;
    }

    private createEdgeList() {
        this.vertices.forEach(vertex => {
            this.adjacencyList.set(vertex, new Set());
            this.reverseAdjacencyList.set(vertex, new Set());
        });
        this.vertices.forEach(vertex => this.edgeMap.set(vertex, []));

        this.edges.forEach(edge => {
            const [v1, v2] = this.config.getVertices(edge);
            this.adjacencyList.get(v1).add(v2);
            this.reverseAdjacencyList.get(v2).add(v1);

            if (this.config.isBidirectional(edge)) {
                this.adjacencyList.get(v2).add(v1);
                this.reverseAdjacencyList.get(v1).add(v2);
            }
            this.edgeMap.get(v1).push(edge);
            this.edgeMap.get(v2).push(edge);
        });
    }
}