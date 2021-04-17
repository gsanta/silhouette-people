

export interface Graph<V, E> {
    edgeBetween(v1: V, v2: V): E;
    vertices(): V[];
    neighbours(v: V): V[];
}