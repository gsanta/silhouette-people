import { Vector3 } from "babylonjs";
import { RouteItem } from "../../../../src/model/item/route/RouteItem";
import { VertexInjector } from "../../../../src/model/item/route/VertexInjector";
import { GraphEdge, GraphVertex } from "../../../../src/service/graph/GraphImpl";


describe('inject', () => {

    it ('injects vertices into a route at a given edge', () => {

        const route = new RouteItem(createRoute());

        const newVertices: GraphVertex[] = [
            new GraphVertex('4', new Vector3(2, 0, 6)),
            new GraphVertex('5', new Vector3(4, 0, 6)),
        ];

        const vertexInjector = new VertexInjector();
        const newRoute = vertexInjector.inject(route, route.lastEdge, newVertices);

        expect(newRoute.getEdges().length).toBe(4);
        expect(newRoute.firstEdge).toBe(route.firstEdge);
        expect(newRoute.getEdge(1).v1).toBe(route.getEdge(1).v1);
        expect(newRoute.getEdge(1).v2).toBe(newVertices[0]);
        expect(newRoute.getEdge(2).v1).toBe(newVertices[0]);
        expect(newRoute.getEdge(2).v2).toBe(newVertices[1]);
        expect(newRoute.getEdge(3).v1).toBe(newVertices[1]);
        expect(newRoute.getEdge(3).v2).toBe(route.lastEdge.v2);
    });
});

function createRoute(): GraphEdge[] {
    const vertices: GraphVertex[] = [
        new GraphVertex('1', new Vector3(1, 0, 1)),
        new GraphVertex('2', new Vector3(1, 0, 5)),
        new GraphVertex('3', new Vector3(5, 0, 5)),
    ];

    return [
        new GraphEdge(vertices[0], vertices[1]),
        new GraphEdge(vertices[1], vertices[2]),
    ]
}