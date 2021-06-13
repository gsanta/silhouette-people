import { Vector3 } from "babylonjs";
import { RouteItem } from "../../src/model/objects/route/RouteItem";
import { GraphEdge } from "../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../src/service/graph/GraphImpl";

export function checkVector3Equal(vec1: Vector3, vec2: Vector3) {
    expect(vec1.x).toBeCloseTo(vec2.x);
    expect(vec1.y).toBeCloseTo(vec2.y);
    expect(vec1.z).toBeCloseTo(vec2.z);
}

export function checkVertexEqual(v1: GraphVertex, v2: GraphVertex) {
    checkVector3Equal(v1.p, v2.p);
}

export class RouteBuilder {
    private points: Vector3[] = [];

    addPoint(x: number, y: number): RouteBuilder {
        this.points.push(new Vector3(x, 0, y));
        return this;
    }

    build(): RouteItem {
        const vertices = this.points.map((p, i) => new GraphVertex(`${i}`, p));
        const edges: GraphEdge[] = [];
        for (let i = 0; i < this.points.length - 1; i++) {
            edges.push(new GraphEdge(vertices[i], vertices[i + 1]));
        }

        return new RouteItem(edges);
    }
}