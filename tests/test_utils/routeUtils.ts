import { Vector3 } from "babylonjs/Maths/math.vector";
import { GraphVertex } from "../../src/service/graph/GraphImpl";

export function checkVector3Equal(vec1: Vector3, vec2: Vector3) {
    expect(vec1.x).toBeCloseTo(vec2.x);
    expect(vec1.y).toBeCloseTo(vec2.y);
    expect(vec1.z).toBeCloseTo(vec2.z);
}

export function checkVertexEqual(v1: GraphVertex, v2: GraphVertex) {
    checkVector3Equal(v1.p, v2.p);
}