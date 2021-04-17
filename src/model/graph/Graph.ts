

export interface Graph<V, E> {
    edgeBetween(v1: V, v2: V): E;
    vertices(): V[];
    edges(): E[];
    vertexCount(): number;
    edgeCount(): number;

    sourceOf(edge: E): V;
    targetOf(edge: E): V;
}