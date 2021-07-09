

export interface Graph<V, E> {
    vertices: Set<V>;
    edges: E[];
    replaceVertex(oldV: V, newV: V): void;
    addEdge(e: E);
    edgeBetween(v1: V, v2: V): E;
    getEdges(vertex: V): E[];
    getNeighbours(vertex: V): Set<V>;
    removeEdge(edge: E, removeIsolatedVertex: boolean);
    updateDirection(edge: E);
    size(): number;
}