import { Vector3 } from "babylonjs";
import { RouteItem } from "../../../../src/model/objects/route/RouteItem";
import { RouteControllerImpl } from "../../../../src/model/objects/game_object/controller_route/RouteControllerImpl";
import { GraphEdge } from "../../../../src/service/graph/GraphEdge";
import { GraphVertex } from "../../../../src/service/graph/GraphImpl";
import { CollisionAvoidance } from "../../../../src/service/motion/collision/CollisionAvoidance";
import { CollisionSensor } from "../../../../src/service/motion/collision/CollisionSensor";
import { CharacterBuilder } from "../../../test_utils/characterUtils";

declare const charBuilder: CharacterBuilder;

describe('avoid', () => {
    it ('route does not change, when no avoidance is needed', () => {
        const character = charBuilder.pos(1, 0, 1).velocity(1, 0, 0).collisionSensorDistance(1).build();
        const obstacle = charBuilder.pos(5, 0, 1).radius(1).build();
        const route = new RouteItem(createRoute());
        const routeWalker = new RouteControllerImpl(route, character);
        const collisionAvoidance = new CollisionAvoidance(routeWalker, new CollisionSensor(character));
        
        collisionAvoidance.avoid([obstacle]);

        expect(routeWalker.getRoute()).toBe(route);
    });

    // it ('route changes, when avoidance is needed', () => {
    //     const character = charBuilder.pos(1, 0, 3).velocity(0, 0, 1).collisionSensorDistance(2).build();
    //     const obstacle = charBuilder.pos(1, 0, 5).radius(1).build();
    //     const route = new RouteItem(createRoute());
    //     const routeWalker = new RouteWalkerImpl(route, character);
    //     const collisionAvoidance = new CollisionAvoidance(routeWalker, new CollisionSensor(character));
        
    //     collisionAvoidance.avoid([obstacle]);
    //     const newRoute = routeWalker.getRoute();

    //     expect(newRoute.getEdges().length).toBe(4);
    //     checkVertexEqual(newRoute.firstEdge.v2, new GraphVertex(undefined, new Vector3(1, 0, 3)));
    //     checkVertexEqual(newRoute.getEdge(1).v1, new GraphVertex(undefined, new Vector3(1, 0, 3)));
    //     checkVertexEqual(newRoute.getEdge(1).v2, new GraphVertex(undefined, new Vector3(1.866, 0, 4.5)));
    //     checkVertexEqual(newRoute.getEdge(2).v1, new GraphVertex(undefined, new Vector3(1.866, 0, 4.5)));
    //     checkVertexEqual(newRoute.getEdge(2).v2, new GraphVertex(undefined, new Vector3(1, 0, 10)));
    //     expect(newRoute.lastEdge).toBe(route.lastEdge);
    // });
});

function createRoute(): GraphEdge[] {
    const vertices: GraphVertex[] = [
        new GraphVertex('1', new Vector3(1, 0, 1)),
        new GraphVertex('2', new Vector3(1, 0, 10)),
        new GraphVertex('3', new Vector3(10, 0, 10)),
    ];

    return [
        new GraphEdge(vertices[0], vertices[1]),
        new GraphEdge(vertices[1], vertices[2]),
    ]
}