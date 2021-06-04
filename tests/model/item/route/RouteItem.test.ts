import { Vector3 } from "babylonjs";
import { RouteItem } from "../../../../src/model/item/route/RouteItem";
import { GraphEdge, GraphVertex } from "../../../../src/service/graph/GraphImpl";


describe('lastVertex', () => {

    it ('get last vertex when last edge is not reversed', () => {
        const vertices = [
            new GraphVertex('1', new Vector3(1, 0, 1)),
            new GraphVertex('2', new Vector3(3, 0, 1)),
            new GraphVertex('3', new Vector3(3, 0, 5)),
        ];

        const edges = [
            new GraphEdge(vertices[0], vertices[1]),
            new GraphEdge(vertices[1], vertices[2]),
        ];

        const routeItem = new RouteItem(edges);

        expect(routeItem.lastVertex).toEqual(vertices[2]);
    });

    it ('get last vertex when last edge is reversed', () => {
        const vertices = [
            new GraphVertex('1', new Vector3(1, 0, 1)),
            new GraphVertex('2', new Vector3(3, 0, 1)),
            new GraphVertex('3', new Vector3(3, 0, 5)),
        ];

        const edges = [
            new GraphEdge(vertices[0], vertices[1]),
            new GraphEdge(vertices[2], vertices[1]),
        ];

        const routeItem = new RouteItem(edges);

        expect(routeItem.lastVertex).toEqual(vertices[2]);
    })
});