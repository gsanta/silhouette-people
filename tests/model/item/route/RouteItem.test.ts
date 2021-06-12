import { Vector3 } from "babylonjs";
import { RouteItem } from "../../../../src/model/item/route/RouteItem";
import { GraphEdge } from "../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../src/service/graph/GraphImpl";
import { RouteBuilder } from "../../../test_utils/routeUtils";

declare const routeBuilder: RouteBuilder;

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

describe('getBorderLine', () => {

    it ('border lines for a non-reversed route', () => {
        const route = routeBuilder.addPoint(1, 1).addPoint(4, 4).addPoint(7, 4).addPoint(7, 8).build();

        const lineEq0 = route.getBorderLine(route.getEdge(0));
        expect(lineEq0.m).toBeCloseTo(-1);
        expect(lineEq0.getY(4)).toBeCloseTo(4);

        const lineEq1 = route.getBorderLine(route.getEdge(1));
        expect(lineEq1.isVertical()).toBeTruthy();
        expect(lineEq1.xIntercept).toBeCloseTo(7);

        const lineEq2 = route.getBorderLine(route.getEdge(2));
        expect(lineEq2.isHorizontal()).toBeTruthy();
        expect(lineEq2.c).toBeCloseTo(8);
    });

    it ('border lines for a reversed route', () => {
        const route = routeBuilder.addPoint(1, 1).addPoint(4, 4).addPoint(7, 4).addPoint(7, 8).build().reverse();

        const lineEq0 = route.getBorderLine(route.getEdge(0));
        expect(lineEq0.m).toBeCloseTo(0);
        expect(lineEq0.c).toBeCloseTo(4);

        const lineEq1 = route.getBorderLine(route.getEdge(1));
        expect(lineEq1.isVertical()).toBeTruthy();
        expect(lineEq1.xIntercept).toBeCloseTo(4);

        const lineEq2 = route.getBorderLine(route.getEdge(2));
        expect(lineEq2.m).toBeCloseTo(-1);
        expect(lineEq2.getY(1)).toBeCloseTo(1);
    });
});