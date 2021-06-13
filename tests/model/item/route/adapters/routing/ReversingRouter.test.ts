import { Vector3 } from "babylonjs";
import { ReversingRouter } from "../../../../../../src/model/item/route/adapters/routing/ReversingRouter";
import { RouteItem } from "../../../../../../src/model/objects/route/RouteItem";
import { RouteControllerImpl } from "../../../../../../src/model/objects/game_object/controller_route/RouteControllerImpl";
import { GraphEdge } from "../../../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../../../src/service/graph/GraphImpl";


describe('edgeChanged', () => {

    it ('does nothing when there is an active edge in route walker', () => {
        const route = new RouteItem(createRoute());
        const routeWalker = new RouteControllerImpl(route, undefined);

        routeWalker.setEdge(route.firstEdge);

        const reversingRouter = new ReversingRouter(routeWalker);
        reversingRouter.edgeChanged();

        expect(routeWalker.getRoute()).toBe(route); 
    });

    it ('reverses route when there is no active edge in route walker', () => {
        const route = new RouteItem(createRoute());
        const routeWalker = new RouteControllerImpl(route, undefined);

        routeWalker.setEdge(undefined);

        const reversingRouter = new ReversingRouter(routeWalker);
        reversingRouter.edgeChanged();

        expect(routeWalker.getRoute()).not.toBe(route);
        expect(routeWalker.getRoute().getEdges()[0]).toBe(route.getEdges()[1]);
        expect(routeWalker.getRoute().getEdges()[1]).toBe(route.getEdges()[0]);
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