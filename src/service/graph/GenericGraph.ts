import { Graph } from "./Graph";

export interface GenericGraphConfig<V, E> {
    getVertices(edge: E): [V, V];
    isBidirectional(edge: E): boolean;
}

export class GenericGraph<V, E> implements Graph<V, E> {
    vertices: Set<V>;
    edges: E[];

    private readonly config: GenericGraphConfig<V, E>;

    private vertexPairs: Map<V, Set<V>> = new Map();
    private edgeMap: Map<V, E[]> = new Map();

    constructor(vertices: V[], edges: E[], config: GenericGraphConfig<V, E>) {
        this.vertices = new Set(vertices);
        this.edges = edges;
        this.config = config;

        this.createEdgeList();
    }

    addEdge(edge: E) {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);

            const [v1, v2] = this.config.getVertices(edge);
            this.addEdgeVertex(v1, v2, edge, true);
            this.addEdgeVertex(v2, v1, edge, this.config.isBidirectional(edge));
        }
    }

    private addEdgeVertex(v1: V, v2: V, edge: E, validDirection: boolean) {
        this.vertices.add(v1);

        if (validDirection) {
            if (!this.vertexPairs.has(v1)) {
                this.vertexPairs.set(v1, new Set());
            }
    
            this.vertexPairs.get(v1).add(v2);
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
        if (this.vertexPairs.has(v1) && this.vertexPairs.get(v1).has(v2)) {
            const edges = this.edgeMap.get(v1);
            return edges.find(edge => {
                const [vertex1, vertex2] = this.config.getVertices(edge);
                return v2 === vertex1 || v2 === vertex2;
            });
        }
    }

    getNeighbours(vertex: V): Set<V> {
        return this.vertexPairs.has(vertex) ? this.vertexPairs.get(vertex) : new Set([]);
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
        this.vertexPairs.get(vertex).delete(otherVertex);
        if (this.vertexPairs.get(vertex).size === 0) {
            this.vertexPairs.delete(vertex);
        }

        this.edgeMap.set(vertex, this.edgeMap.get(vertex).filter(e => e !== edge));

        
        if (removeIsolatedVertex) {
            if (!this.vertexPairs.has(vertex)) {
                this.vertices.delete(vertex);
            }
        }
    }

    size(): number {
        return this.edges.length;
    }

    setup(vertices: V[], edges: E[]) {
        
    }

    private createEdgeList() {
        this.vertices.forEach(vertex => this.vertexPairs.set(vertex, new Set()));
        this.vertices.forEach(vertex => this.edgeMap.set(vertex, []));

        this.edges.forEach(edge => {
            const [v1, v2] = this.config.getVertices(edge);
            this.vertexPairs.get(v1).add(v2);

            if (this.config.isBidirectional(edge)) {
                this.vertexPairs.get(v2).add(v1);
            }
            this.edgeMap.get(v1).push(edge);
            this.edgeMap.get(v2).push(edge);
        });
    }
}