

export interface Graph<V, E> {
    vertices: Set<V>;
    edges: E[];
    addEdge(e: E);
    edgeBetween(v1: V, v2: V): E;
    getEdges(vertex: V): E[];
    getNeighbours(vertex: V): Set<V>;
    removeEdge(edge: E, removeIsolatedVertex: boolean);
    size(): number;
}