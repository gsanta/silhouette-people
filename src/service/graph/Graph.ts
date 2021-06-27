import { Vector3 } from "babylonjs/Maths/math.vector";


export interface Graph<V, E> {
    vertices: V[];
    edges: E[];
    edgeBetween(v1: V, v2: V): E;
    getEdges(vertex: V): E[];
    getByPos(pos: Vector3): V;
    getById(id: string): V;
    removeEdge(edge: E);
}